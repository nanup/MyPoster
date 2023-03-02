import "./Auth.css";

import React, { useContext, useState } from "react";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "./../../shared/components/util/validators";

import { AuthContext } from "../../shared/components/FormElements/context/auth-context";
import Button from "../../shared/components/FormElements/Button";
import Card from "./../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Input from "../../shared/components/FormElements/Input";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import useForm from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const ctx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
            value: "",
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
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );

        ctx.login();
        ctx.userId = responseData.userId;
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            name: formState.inputs.username.value,
          }),
          { "Content-Type": "application/json" }
        );

        navigate("/");
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className='authentication'>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
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
            {isLogin ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button onClick={switchHandler} inverse>
          SWITCH TO {isLogin ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
