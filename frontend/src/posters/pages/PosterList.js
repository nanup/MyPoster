import "./PosterList.css";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import PosterListItem from "./PosterListItem";
import React from "react";

const PosterList = (props) => {
  if (props.posters.length !== 0) {
    return (
      <ul className='place-list'>
        {props.posters.map((poster) => (
          <PosterListItem
            key={poster._id}
            id={poster._id}
            image={poster.image}
            title={poster.title}
            year={poster.year}
            description={poster.description}
            trailerLink={poster.trailerLink}
            userid={poster.userid}
            onDelete={props.onDelete(props.id)}
          />
        ))}
      </ul>
    );
  } else {
    return (
      <div className='place-list center'>
        <Card>
          <h2>No posters.</h2>
          <Button to='/posters/new'>Share Poster</Button>
        </Card>
      </div>
    );
  }
};

export default PosterList;
