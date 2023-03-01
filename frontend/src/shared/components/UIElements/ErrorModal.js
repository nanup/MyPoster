import Button from "../FormElements/Button";
import Modal from "./Modal";
import React from "react";

const ErrorModal = (props) => {
  return (
    <Modal
      onCancel={props.onClear}
      header='An Error Occurred!'
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}>
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
