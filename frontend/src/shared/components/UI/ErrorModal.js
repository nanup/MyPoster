import Button from '../Form/Button';
import Modal from './Modal';
import React from 'react';

const ErrorModal = (props) => {
  return (
    <Modal
      onCancel={props.onClear}
      header='ERROR'
      show={!!props.error}
      footer={
        <div>
          <p>{props.error}</p>
          <br></br>
          <Button onClick={props.onClear}>Close</Button>
        </div>
      }></Modal>
  );
};

export default ErrorModal;
