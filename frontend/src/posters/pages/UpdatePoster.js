import React, { useContext, useEffect, useState } from "react";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "./../../shared/components/util/validators";

import { AuthContext } from "./../../shared/components/FormElements/context/auth-context";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Input from "../../shared/components/FormElements/Input";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import useForm from "./../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UpdatePoster = () => {
  const posterId = useParams().posterId;
  const [poster, setPoster] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

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
      trailerLink: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPoster = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/posters/" + posterId,
          "GET",
          null,
          {}
        );

        setPoster(responseData.poster);
        setFormData(
          {
            title: {
              value: responseData.poster.title,
              isValid: true,
            },
            year: {
              value: responseData.poster.year,
              isValid: true,
            },
            image: {
              value: responseData.poster.image,
              isValid: true,
            },
            trailerLink: {
              value: responseData.poster.trailerLink,
              isValid: true,
            },
            description: {
              value: responseData.poster.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };

    fetchPoster();
  }, [posterId, sendRequest, setFormData]);

  const updatePosterHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        "http://localhost:5000/api/posters/" + posterId,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          year: formState.inputs.year.value,
          image: formState.inputs.image.value,
          trailerLink: formState.inputs.trailerLink.value,
        }),
        {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + auth.token
        }
      );
      navigate("/" + auth.userId + "/posters");
    } catch (err) {}
  };

  if (!poster) {
    return (
      <div className='center'>
        <h2>Could not find the Poster!</h2>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {formState.inputs.title.value && !isLoading && (
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
          <Input
            id='trailerLink'
            element='input'
            type='text'
            label='Trailer Embed Link'
            validators={[]}
            errorText='Please enter a valid embed link.'
            onInput={inputHandler}
            value={formState.inputs.trailerLink.value}
            validity={true}
          />
          <p style={{ color: "red" }}>* fields are required</p>
          <Button type='submit' disabled={!formState.isValid}>
            Update Poster
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePoster;