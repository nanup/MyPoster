import React, { useContext, useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";

import "./PosterListItem.css";
import { AuthContext } from "./../../shared/components/FormElements/context/auth-contex";

const PosterListItem = (props) => {
  const ctx = useContext(AuthContext);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

  const confirmShowConfirm = () => {
    setShowConfirm(false);
    console.log("DELETING...");
  };

  return (
    <React.Fragment>
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
            {ctx.isLoggedIn && (
              <Button to={`/posters/${props.id}`}>EDIT</Button>
            )}
            {ctx.isLoggedIn && (
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
