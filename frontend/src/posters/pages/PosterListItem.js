import React, { useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";

import "./PosterListItem.css";

const PosterListItem = (props) => {
  const [showTrailer, setShowTrailer] = useState(false);

  const showTrailerHandler = () => {
    setShowTrailer(true);
  }

  const hideTrailerHandler = () => {
    setShowTrailer(false);
  }

  return <React.Fragment>
    <Modal
      show={showTrailer}
      onCancel={hideTrailerHandler}
      header={props.title}
      contentClass={"place-item__modal-content"}
      footerClass={"place-item__modal-actions"}
      footer={<Button onClick={hideTrailerHandler}>Close</Button>}>
      <div className="map-container">
        <iframe height="275" src={props.trailerlink} frameborder="0" />
      </div>
    </Modal>
    <li className="place-item">
      <Card className="place-item__content">
        <div className="place-item__image">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="place-item__info">
          <h2>{props.title}</h2>
          <h3>{props.year}</h3>
          <p>{props.description}</p>
        </div>
        <div className="place-item__actions">
          <Button onClick={showTrailerHandler} inverse>VIEW TRAILER</Button>
          <Button to={`/posters/${props.id}`}>EDIT</Button>
          <Button danger>DELETE</Button>
        </div>
      </Card>
    </li>
  </React.Fragment>

}

export default PosterListItem;