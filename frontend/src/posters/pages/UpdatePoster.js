import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "./../../shared/components/util/validators";
import useForm from "./../../shared/hooks/form-hook";

const DUMMY_POSTERS = [
  {
    id: "p1",
    title: "In the Mood for Love",
    description: "Wong Kar Wai's colorful masterpiece",
    image: "https://i.redd.it/c03fqf6peuca1.jpg",
    year: 2000,
    trailerLink: "https://www.youtube.com/embed/m8GuedsQnWQ",
    userid: "u1",
  },
];

const UpdatePoster = () => {
  const posterId = useParams().posterId;

  const [formState, inputHandler, setFormData] = useForm(
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
    },
    false
  );

  const poster = DUMMY_POSTERS.find((p) => p.id === posterId);

  useEffect(() => {
    setFormData(
      {
        title: {
          value: poster.title,
          isValid: true,
        },
        year: {
          value: poster.year,
          isValid: true,
        },
        image: {
          value: poster.image,
          isValid: true,
        },
      },
      true
    );
  }, [setFormData, poster]);

  const updatePosterHandler = (event) => {
    event.preventDefault();

    console.log(formState.inputs);
  };

  return (
    formState.inputs.title.value && (
      <form onSubmit={updatePosterHandler} className='place-form'>
        <Input
          id='title'
          element='input'
          type='text'
          label='Title *'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid title.'
          onInput={inputHandler}
          value={formState.inputs.title.value}
          validity={true}
        />
        <Input
          id='year'
          element='input'
          type='number'
          label='Year *'
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MINLENGTH(4),
            VALIDATOR_MAXLENGTH(4),
          ]}
          errorText='Please enter a valid year.'
          onInput={inputHandler}
          value={formState.inputs.year.value}
          validity={true}
        />
        <Input
          id='image'
          element='input'
          type='text'
          label='Image Link *'
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(4)]}
          errorText='Please enter a valid title.'
          onInput={inputHandler}
          value={formState.inputs.image.value}
          validity={true}
        />
        <p style={{ color: "red" }}>* fields are required</p>
        <Button type='submit' disabled={!formState.isValid}>
          Update Poster
        </Button>
      </form>
    )
  );
};

export default UpdatePoster;
