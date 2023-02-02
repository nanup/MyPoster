import React from "react";

import Input from "../../shared/components/FormElements/Input";
import "./NewPoster.css";

const NewPoster = () => {
  return (
    <form className='place-form'>
      <Input element='input' type='text' label='Title' />
    </form>
  );
};

export default NewPoster;
