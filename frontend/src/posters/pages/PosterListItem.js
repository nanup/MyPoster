import './PosterListItem.css';

import React, { useContext, useState } from 'react';

import { AuthContext } from './../../shared/context/auth-context';
import Button from '../../shared/components/Form/Button';
import ErrorModal from '../../shared/components/UI/ErrorModal';
import Modal from '../../shared/components/UI/Modal';
import { useHttpClient } from '../../shared/hooks/httpHook';

const PosterListItem = (props) => {
  const ctx = useContext(AuthContext);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { error, sendRequest, clearError } = useHttpClient();

  const showTrailerHandler = () => {
    setShowTrailer(true);
  };

  const hideTrailerHandler = () => {
    setShowTrailer(false);
  };

  const showConfirmHandler = () => {
    setShowConfirm(true);
  };

  const cancelShowConfirm = () => {
    setShowConfirm(false);
  };

  const confirmShowConfirm = async () => {
    setShowConfirm(false);
    await sendRequest(
      process.env.REACT_APP_API_URL + '/posters/' + props.id,
      'DELETE',
      null,
      {
        Authorization: 'Bearer ' + ctx.token,
      }
    );
    props.onDelete(props.id);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showTrailer}
        onCancel={hideTrailerHandler}
        imageUrl={props.imageUrl}
        title={props.title}
        year={props.year}
        trailerUrl={props.trailerUrl}></Modal>
      <Modal
        show={showConfirm}
        imageUrl={props.imageUrl}
        onCancel={cancelShowConfirm}
        onConfirm={confirmShowConfirm}
        header='DELETE'></Modal>
      <li className='entry-item'>
        <div className='poster-item-image'>
          <img src={props.imageUrl} alt={props.title} />
        </div>
        <div className='poster-item-info-buttons'>
          <div className='poster-item-info'>
            <h2>{`${props.title} (${props.year})`}</h2>
            <p>{props.description}</p>
          </div>
          <div className='poster-item-buttons'>
            <Button onClick={showTrailerHandler}>WATCH TRAILER</Button>
            {ctx.userId === props.userid && (
              <Button to={`/posters/${props.id}`} inverse>
                EDIT
              </Button>
            )}
            {ctx.userId === props.userid && (
              <Button danger onClick={showConfirmHandler}>
                DELETE
              </Button>
            )}
          </div>
        </div>
      </li>
    </React.Fragment>
  );
};

export default PosterListItem;
