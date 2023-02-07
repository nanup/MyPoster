import React, { useCallback } from "react";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/components/util/validators";

import "./NewPoster.css";

const NewPoster = () => {
  const titleInputHanler = useCallback((id, value, isValid) => {}, []);

  const descInputHanler = useCallback((id, value, isValid) => {}, []);

  return (
    <form className='place-form'>
      <Input
        element='input'
        errorText={"Please enter a valid title"}
        id='Title'
        input={""}
        label='Title'
        onInput={titleInputHanler}
        type='text'
        validators={[VALIDATOR_REQUIRE()]}
      />
      <Input
        element='textarea'
        errorText={"Please enter a valid description"}
        id='Description'
        label='Description'
        onInput={descInputHanler}
        validators={[VALIDATOR_MINLENGTH(5)]}
      />
    </form>
  );
};

export default NewPoster;
