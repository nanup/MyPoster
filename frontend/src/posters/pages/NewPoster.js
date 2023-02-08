import React, { useCallback, useReducer } from "react";

import Button from "./../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
} from "../../shared/components/util/validators";

import "./NewPoster.css";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
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

  const inputHandler = useCallback(
    (id, value, isValid) => {
      dispatch({
        inputId: id,
        isValid: isValid,
        type: "INPUT_CHANGE",
        value: value,
      });
    },
    [dispatch]
  );

  const addPosterHandler = (event) => {
    event.preventDefault();

    console.log(formState.inputs);
  };

  return (
    <form onSubmit={addPosterHandler} className='place-form'>
      <Input
        element='input'
        errorText={"Please enter a valid title"}
        id='title'
        label='Title *'
        onInput={inputHandler}
        type='text'
        validators={[VALIDATOR_REQUIRE()]}
      />
      <Input
        element='input'
        errorText={"Please enter a valid year"}
        id='year'
        label='Year *'
        onInput={inputHandler}
        type='number'
        validators={[VALIDATOR_MINLENGTH(4), VALIDATOR_MAXLENGTH(4)]}
      />
      <Input
        element='input'
        errorText={"Please enter a valid image link"}
        id='image'
        label='Image Link *'
        onInput={inputHandler}
        type='text'
        validators={[VALIDATOR_MINLENGTH(0)]}
      />
      <Input
        element='input'
        errorText={"Please enter a valid trailer embed link"}
        id='trailerLink'
        label='Trailer Embed Link'
        onInput={inputHandler}
        type='text'
        validators={[]}
      />
      <Input
        element='textarea'
        errorText={"Please enter a valid description"}
        id='description'
        label='Description'
        onInput={inputHandler}
        validators={[]}
      />
      <p style={{ color: "red" }}>* fields are required</p>
      <Button type='submit' disabled={!formState.isValid}>
        Add Poster
      </Button>
    </form>
  );
};

export default NewPoster;
