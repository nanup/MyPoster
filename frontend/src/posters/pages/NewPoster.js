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

const AUTOFILL_INPUTS = [
  {
    title: "Everything Everywhere All at Once",
    year: 2022,
    image:
      "https://www.themoviedb.org/t/p/original/v1zlUrRdMZ2r8zQAbkFjXGug96O.jpg",
    trailerLink: "https://www.youtube.com/embed/wxN1T1uxQ2g",
    description:
      "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save what's important to her by connecting with the lives she could have led in other universes.",
  },
  {
    title: "Avatar: The Way of Water",
    year: 2022,
    image:
      "https://www.themoviedb.org/t/p/original/buGUFtNDeduNQk0Fk2iWo0kgUI1.jpg",
    trailerLink: "https://www.youtube.com/embed/a8Gx8wiNbs8",
    description:
      "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
  },
  {
    title: "Top Gun: Maverick",
    year: 2022,
    image:
      "https://www.themoviedb.org/t/p/original/zOGINv5sJxEZQWw2dGuO8JUzvyK.jpg",
    trailerLink: "https://www.youtube.com/embed/qSqVVswa420",
    description:
      "After more than thirty years of service as one of the Navy’s top aviators, and dodging the advancement in rank that would ground him, Pete “Maverick” Mitchell finds himself training a detachment of TOP GUN graduates for a specialized mission the likes of which no living pilot has ever seen.",
  },
  {
    title: "The Last of Us",
    year: 2022,
    image:
      "https://www.themoviedb.org/t/p/original/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
    trailerLink: "https://www.youtube.com/embed/EVyDWbsucRA",
    description:
      "Twenty years after modern civilization has been destroyed, Joel, a hardened survivor, is hired to smuggle Ellie, a 14-year-old girl, out of an oppressive quarantine zone. What starts as a small job soon becomes a brutal, heartbreaking journey, as they both must traverse the United States and depend on each other for survival.",
  },
  {
    title: "Chainsaw Man",
    year: 2022,
    image:
      "https://www.themoviedb.org/t/p/original/npdB6eFzizki0WaZ1OvKcJrWe97.jpg",
    trailerLink: "https://www.youtube.com/embed/5Trz4N2bNy8",
    description:
      "Denji has a simple dream—to live a happy and peaceful life, spending time with a girl he likes. This is a far cry from reality, however, as Denji is forced by the yakuza into killing devils in order to pay off his crushing debts. Using his pet devil Pochita as a weapon, he is ready to do anything for a bit of cash.",
  },
];

const NewPoster = () => {
  const ctx = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
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
        process.env.REACT_APP_URL + "/posters",
        "POST",
        JSON.stringify({
          userId: ctx.userId,
          title: formState.inputs.title.value,
          year: formState.inputs.year.value,
          image: formState.inputs.image.value,
          trailerLink: formState.inputs.trailerLink.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + ctx.token,
        }
      );

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='addposter-container'>
      <ErrorModal error={error} onClear={clearError} />
      <form onSubmit={addPosterHandler} className='place-form'>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          element='input'
          errorText={"Please enter a valid title"}
          id='title'
          label='Title*'
          onInput={inputHandler}
          value={formState.inputs.title.value}
          type='text'
          validators={[VALIDATOR_REQUIRE()]}
        />
        <Input
          element='input'
          errorText={"Please enter a valid year"}
          id='year'
          label='Year*'
          onInput={inputHandler}
          type='number'
          validators={[VALIDATOR_MINLENGTH(4), VALIDATOR_MAXLENGTH(4)]}
        />
        <Input
          element='input'
          errorText={"Please enter a valid image link"}
          id='image'
          label='Poster Link* (Ex: TMDb)'
          onInput={inputHandler}
          type='text'
          validators={[VALIDATOR_MINLENGTH(0)]}
        />
        <Input
          element='input'
          errorText={"Please enter a valid trailer embed link"}
          id='trailerLink'
          label='Trailer Embed Link (Ex: YouTube)'
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
    </div>
  );
};

export default NewPoster;
