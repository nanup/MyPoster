import './NewPoster.css';

import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/components/util/validators';

import AUTOFILL_INPUTS from '../AutofillInputs';
import { AuthContext } from '../../shared/context/auth-context';
import Button from './../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UI/ErrorModal';
import Input from '../../shared/components/FormElements/Input';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import React from 'react';
import { useContext } from 'react';
import useForm from './../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/httpHook';
import { useNavigate } from 'react-router-dom';

const NewPoster = () => {
  const ctx = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      year: {
        value: '',
        isValid: false,
      },
      imageUrl: {
        value: '',
        isValid: false,
      },
      trailerUrl: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
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
        process.env.dev.REACT_APP_URL + '/posters',
        'POST',
        JSON.stringify({
          userId: ctx.userId,
          title: formState.inputs.title.value,
          year: formState.inputs.year.value,
          imageUrl: formState.inputs.imageUrl.value,
          trailerUrl: formState.inputs.trailerUrl.value,
          description: formState.inputs.description.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + ctx.token,
        }
      );

      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const autofillHandler = (event) => {
    event.preventDefault();

    const autofillData =
      AUTOFILL_INPUTS[Math.floor(Math.random() * AUTOFILL_INPUTS.length)];

    setFormData(
      {
        title: {
          value: autofillData.title,
          isValid: true,
        },
        year: {
          value: autofillData.year,
          isValid: true,
        },
        imageUrl: {
          value: autofillData.imageUrl,
          isValid: true,
        },
        trailerUrl: {
          value: autofillData.trailerUrl,
          isValid: true,
        },
        description: {
          value: autofillData.description,
          isValid: true,
        },
      },
      true
    );
  };

  return (
    <div className='addposter-container'>
      <ErrorModal
        error={error}
        onClear={clearError}
      />
      <form
        onSubmit={addPosterHandler}
        className='place-form'>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          element='input'
          errorText={'Please enter a valid title'}
          id='title'
          label='Title*'
          value={formState.inputs.title.value}
          onInput={inputHandler}
          type='text'
          validators={[VALIDATOR_REQUIRE()]}
        />
        <Input
          element='input'
          errorText={'Please enter a valid year'}
          id='year'
          label='Year*'
          value={formState.inputs.year.value}
          onInput={inputHandler}
          type='number'
          validators={[VALIDATOR_MINLENGTH(4), VALIDATOR_MAXLENGTH(4)]}
        />
        <Input
          element='input'
          errorText={'Please enter a valid imageUrl link'}
          id='imageUrl'
          label='Poster Link* (Ex: TMDb)'
          value={formState.inputs.imageUrl.value}
          onInput={inputHandler}
          type='text'
          validators={[VALIDATOR_MINLENGTH(0)]}
        />
        <Input
          element='input'
          errorText={'Please enter a valid trailer embed link'}
          id='trailerUrl'
          label='Trailer Embed Link (Ex: YouTube)'
          value={formState.inputs.trailerUrl.value}
          onInput={inputHandler}
          type='text'
          validators={[]}
        />
        <Input
          element='textarea'
          errorText={'Please enter a valid description'}
          id='description'
          label='Description'
          value={formState.inputs.description.value}
          onInput={inputHandler}
          validators={[]}
        />
        <p style={{ color: 'red' }}>* fields are required</p>
        <Button
          type='submit'
          disabled={!formState.isValid}>
          Add Poster
        </Button>
        <Button onClick={autofillHandler}>Autofill</Button>
      </form>
    </div>
  );
};

export default NewPoster;
