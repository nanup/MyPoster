import React, { useContext, useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import useForm from "../../shared/hooks/form-hook";
import Card from "./../../shared/components/UIElements/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "./../../shared/components/util/validators";
import "./Auth.css";
import { AuthContext } from "./../../shared/components/FormElements/context/auth-contex";

const Auth = () => {
  const ctx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
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

  const loginHandler = (event) => {
    event.preventDefault();
    ctx.login();
    
  };

  return (
    <Card className='authentication'>
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
  );
};

export default Auth;
