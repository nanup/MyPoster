import './Auth.css';

import { useContext, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from './../../shared/components/util/validators';

import { AuthContext } from '../../shared/context/auth-context';
import Button from '../../shared/components/Form/Button';
import ErrorModal from '../../shared/components/UI/ErrorModal';
import Input from '../../shared/components/Form/Input';
import useForm from '../../shared/hooks/formHook';
import { useHttpClient } from '../../shared/hooks/httpHook';

const Auth = () => {
  const ctx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const { error, sendRequest, clearError } = useHttpClient();

  const switchHandler = (event) => {
    if (!isLogin) {
      setFormData(
        {
          ...formState.inputs,
          username: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          username: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLogin((prev) => !prev);
  };

  const loginHandler = async (event) => {
    event.preventDefault();

    if (isLogin) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_API_URL + '/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { 'Content-Type': 'application/json' }
        );

        ctx.login(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        await sendRequest(
          process.env.REACT_APP_API_URL + '/users/signup',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            name: formState.inputs.username.value,
          }),
          { 'Content-Type': 'application/json' }
        );

        navigate('/');
      } catch (err) {}
    }
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className='auth'>
        <form onSubmit={loginHandler}>
          {!isLogin && (
            <Input
              element='input'
              errorText='Please enter a valid username'
              id='username'
              label='Username'
              onInput={inputHandler}
              type='text'
              validators={[VALIDATOR_REQUIRE()]}
            />
          )}
          <Input
            element='input'
            errorText='Please enter a valid email address'
            id='email'
            label='E-mail'
            onInput={inputHandler}
            type='email'
            validators={[VALIDATOR_EMAIL()]}
          />
          <Input
            element='input'
            errorText='Please enter a valid password'
            id='password'
            label='Password'
            onInput={inputHandler}
            type='password'
            validators={[VALIDATOR_MINLENGTH(6)]}
          />
          <Button type='submit' disabled={!formState.isValid}>
            {isLogin ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button onClick={switchHandler} inverse>
          SWITCH TO {isLogin ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </div>
    </Fragment>
  );
};

export default Auth;
