import "./NewPoster.css";

import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/util/validators";

import { AuthContext } from "../../shared/components/FormElements/context/auth-context";
import Button from "./../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Input from "../../shared/components/FormElements/Input";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import React from "react";
import { useContext } from "react";
import useForm from "./../../shared/hooks/form-hook";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import { useNavigate } from "react-router-dom";

const NewPoster = () => {
  const ctx = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
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

  const navigate = useNavigate();

  const addPosterHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        "http://localhost:5000/api/posters",
        "POST",
        JSON.stringify({
          userId: ctx.userId,
          title: formState.inputs.title.value,
          year: formState.inputs.year.value,
          image: formState.inputs.image.value,
          trailerLink: formState.inputs.trailerLink.value,
          description: formState.inputs.description.value,
        }),
        { "Content-Type": "application/json" }
      );

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form onSubmit={addPosterHandler} className='place-form'>
        {isLoading && <LoadingSpinner asOverlay />}
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
    </React.Fragment>
  );
};

export default NewPoster;
