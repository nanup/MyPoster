import './Input.css';

import { useEffect, useReducer } from 'react';

import { validate } from '../util/validators';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatchFn] = useReducer(inputReducer, {
    value: props.value || '',
    isValid: props.validity || false,
    isTouched: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  useEffect(() => {
    if (props.value) {
      dispatchFn({
        type: 'CHANGE',
        val: props.value,
        validators: props.validators,
      });
    }
  }, [props.value, props.validators]);

  const changeHandler = (event) => {
    dispatchFn({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatchFn({
      type: 'TOUCH',
    });
  };

  if (!inputState.isTouched && (id === 'trailerUrl' || id === 'description')) {
    touchHandler();
    dispatchFn({
      type: 'CHANGE',
      val: '',
      validators: [],
    });
  }

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        onBlur={touchHandler}
        onChange={changeHandler}
        placeholder={props.placeholder}
        type={props.type}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        onBlur={touchHandler}
        onChange={changeHandler}
        rows={props.rows || 3}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && 'form-control--invalid'
      }`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
