import "./ImageUpload.css";

import React, { useEffect, useRef, useState } from "react";

import Button from "./Button";

const ImageUpload = (props) => {
  const fileInputRef = useRef();
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    if (!file) {
      return;
    } else {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreview(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  }, [file]);

  const changeHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const uploadHandler = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='form-control'>
      <input
        ref={fileInputRef}
        id='props.id'
        style={{ display: "none" }}
        type='file'
        onChange={changeHandler}
        accept='.jpeg, .jpg, .png, .webp'
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className='image-upload__preview'>
          {preview && <img src={preview} alt='preview' />}
          {!preview && <p>Please pick an image.</p>}
        </div>
        <Button type='button' onClick={uploadHandler}>
          Upload
        </Button>
      </div>
      {!isValid && <p style={{ color: "red" }}>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
