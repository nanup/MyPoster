import React, { useEffect, useReducer } from "react";

import { validate } from "../util/validators";

import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
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
    value: "",
    isValid: false,
    isTouched: false,
  });

  const { id, onInput, validators } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    if (id === "trailerLink" || id ==="description") {
      touchHandler();
      dispatchFn({
        type: "CHANGE",
        val: "",
        validators: validators,
      });
    }
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatchFn({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatchFn({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "input" ? (
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
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
