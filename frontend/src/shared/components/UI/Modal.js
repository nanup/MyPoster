import { CSSTransition } from 'react-transition-group';
import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';
import Backdrop from './Backdrop';

const ModalOverlay = (props) => {
  const modal = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </header>
      <form
        className='modal__form'
        onSubmit={
          props.onSubmit
            ? props.onSubmit
            : (event) => {
                event.preventDefault();
              }
        }>
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
      </form>
    </div>
  );

  return ReactDOM.createPortal(modal, document.getElementById('modal'));
};

const Modal = (props) => {
  return (
    <Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        timeout={300}
        classNames=''
        mountOnEnter
        unmountOnExit>
        <ModalOverlay {...props} />
      </CSSTransition>
    </Fragment>
  );
};

export default Modal;
