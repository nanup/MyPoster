import "./PosterListItem.css";

import React, { useContext, useState } from "react";

import { AuthContext } from "./../../shared/components/FormElements/context/auth-context";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Modal from "../../shared/components/UIElements/Modal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const PosterListItem = (props) => {
  const ctx = useContext(AuthContext);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
    await sendRequest(
      "http://localhost:5000/api/posters/" + props.id,
      "DELETE",
      null,
      {}
    );
    props.onDelete();
    setShowConfirm(false);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showTrailer}
        onCancel={hideTrailerHandler}
        header={props.title}
        contentClass={"place-item__modal-content"}
        footerClass={"place-item__modal-actions"}
        footer={<Button onClick={hideTrailerHandler}>Close</Button>}>
        <div className='map-container'>
            <iframe
              title='YouTube Trailer'
              height='275'
              src={props.trailerLink}
              frameBorder='0'
            />
        </div>
      </Modal>
      <Modal
        show={showConfirm}
        onCancel={cancelShowConfirm}
        header='Are you sure?'
        footerClass='place-item__modal-actions'
        footer={
          <React.Fragment>
            <Button onClick={cancelShowConfirm} inverse>
              CANCEL
            </Button>
            <Button onClick={confirmShowConfirm} danger>
              DELETE
            </Button>
          </React.Fragment>
        }>
        <p>Do you want to delete this poster?</p>
        <div className='map-container'>
          <img
            style={{ height: "14rem" }}
            src={props.image}
            alt={props.title}
          />
        </div>
      </Modal>
      <li className='place-item'>
        <Card className='place-item__content'>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className='place-item__image'>
            <img src={props.image} alt={props.title} />
          </div>
          <div className='place-item__info'>
            <h2>{props.title}</h2>
            <h3>{props.year}</h3>
            <p>{props.description}</p>
          </div>
          <div className='place-item__actions'>
            <Button onClick={showTrailerHandler} inverse>
              VIEW TRAILER
            </Button>
            {ctx.userId === props.userid && (
              <Button to={`/posters/${props.id}`}>EDIT</Button>
            )}
            {ctx.userId === props.userid && (
              <Button danger onClick={showConfirmHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PosterListItem;
