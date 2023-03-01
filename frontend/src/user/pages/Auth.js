import "./Auth.css";

import React, { useContext, useState } from "react";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "./../../shared/components/util/validators";

import { AuthContext } from "./../../shared/components/FormElements/context/auth-contex";
import Button from "../../shared/components/FormElements/Button";
import Card from "./../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Input from "../../shared/components/FormElements/Input";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import useForm from "../../shared/hooks/form-hook";

const Auth = () => {
  const ctx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const json = await response.json();

        if (response.ok) {
          setIsLoading(false);
          ctx.login();
          console.log(json);
        } else {
          throw new Error(json.errorMessage);
        }
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.username.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();

        if (responseData.ok) {
          setIsLoading(false);
          ctx.login();
          console.log(responseData);
        } else {
          throw new Error(responseData.errorMessage);
        }
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={() => setError("")} />
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
