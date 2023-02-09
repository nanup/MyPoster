import React from "react";

import Button from "./../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
} from "../../shared/components/util/validators";

import useForm from "./../../shared/hooks/form-hook";

import "./NewPoster.css";

const NewPoster = () => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      year: {
        value: "",
        isValid: false,
      },
      image: {
        value: "",
        isValid: false,
      },
      trailerLink: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
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
