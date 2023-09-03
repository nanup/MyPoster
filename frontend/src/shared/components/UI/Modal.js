import { CSSTransition } from 'react-transition-group';
import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';
import Backdrop from './Backdrop';
import closeIcon from '../../../icons/close-icon.png';

const ModalOverlay = (props) => {
  const modal = (
    <div className='modal'>
      <section className='modal-poster'>
        <img src={props.imageUrl} alt={props.title + ' Poster'} />
      </section>
      <section className='modal-trailer-info'>
        <div className='modal-trailer'>
          <iframe
            src={props.trailerUrl}
            title='trailer'
            allowFullScreen></iframe>
        </div>
        <div className='modal-info'>
          <h1>{`${props.title} (${props.year})`}</h1>
          <div onClick={props.onCancel} className='close'>
            <img src={closeIcon} alt='Close' />
          </div>
        </div>
      </section>
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
        className=''
        mountOnEnter
        unmountOnExit>
        <ModalOverlay {...props} />
      </CSSTransition>
    </Fragment>
  );
};

export default Modal;
