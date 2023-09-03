import './UpdatePoster.css';

import React, { useContext, useEffect, useState } from 'react';
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from './../../shared/components/util/validators';

import { AuthContext } from './../../shared/context/auth-context';
import Button from '../../shared/components/Form/Button';
import ErrorModal from '../../shared/components/UI/ErrorModal';
import Input from '../../shared/components/Form/Input';
import useForm from './../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/httpHook';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UpdatePoster = () => {
  const posterId = useParams().posterId;
  const [poster, setPoster] = useState();
  const { error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

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
    },
    false
  );

  useEffect(() => {
    const fetchPoster = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_API_URL + '/posters/' + posterId,
          'GET',
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
            imageUrl: {
              value: responseData.poster.imageUrl,
              isValid: true,
            },
            trailerUrl: {
              value: responseData.poster.trailerUrl,
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
        process.env.REACT_APP_API_URL + '/posters/' + posterId,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          year: formState.inputs.year.value,
          imageUrl: formState.inputs.imageUrl.value,
          trailerUrl: formState.inputs.trailerUrl.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );
      navigate('/' + auth.userId + '/posters');
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
      <ErrorModal
        error={error}
        onClear={clearError}
      />
      {formState.inputs.title.value && (
        <form
          onSubmit={updatePosterHandler}
          className='updateposter-form'>
          <Input
            id='title'
            element='input'
            type='text'
            label='Title*'
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
            label='Year*'
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
            id='imageUrl'
            element='input'
            type='text'
            label='Poster Link* (Ex: TMDb)'
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(4)]}
            errorText='Please enter a valid title.'
            onInput={inputHandler}
            value={formState.inputs.imageUrl.value}
            validity={true}
          />
          <Input
            id='trailerUrl'
            element='input'
            type='text'
            label='Trailer Embed Link (Ex: YouTube)'
            validators={[]}
            errorText='Please enter a valid embed link.'
            onInput={inputHandler}
            value={formState.inputs.trailerUrl.value}
            validity={true}
          />
          <p style={{ color: 'red' }}>* fields are required</p>
          <Button
            type='submit'
            disabled={!formState.isValid}>
            Update Poster
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePoster;
