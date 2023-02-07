import React, { useCallback, useReducer } from "react";

import Button from "./../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/components/util/validators";

import "./NewPoster.css";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;

      for (const input in state.inputs) {
        if (input === action.inputeId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[input].isValid;
        }
      }

      return {
        ...state,
        input: {
          ...state.input,
          [action.input]: {
            value: action.value,
            isValid: action.isValid,
          },
          isValid: formIsValid,
        },
      };
    default:
      return state;
  }
};

const NewPoster = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputHanler = useCallback(
    (id, value, isValid) => {
      dispatch({
        input: id,
        isValid: isValid,
        type: "INPUT_CHANGE",
        value: value,
      });
    },
    [dispatch]
  );

  return (
    <form className='place-form'>
      <Input
        element='input'
        errorText={"Please enter a valid title"}
        id='Title'
        input={""}
        label='Title'
        onInput={inputHanler}
        type='text'
        validators={[VALIDATOR_REQUIRE()]}
      />
      <Input
        element='textarea'
        errorText={"Please enter a valid description"}
        id='Description'
        label='Description'
        onInput={inputHanler}
        validators={[VALIDATOR_MINLENGTH(5)]}
      />
      <Button type='submit' disabled={!formState.isValid}>
        Add Poster
      </Button>
    </form>
  );
};

export default NewPoster;
