import React from "react";
import PosterListItem from "./PosterListItem";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";

import "./PosterList.css";

const PosterList = (props) => {
  if (props.posters.length !== 0) {
    return (
      <ul className='place-list'>
        {props.posters.map((poster) => (
          <PosterListItem
            key={poster.id}
            id={poster.id}
            image={poster.image}
            title={poster.title}
            year={poster.year}
            description={poster.description}
            trailerLink={poster.trailerLink}
            userid={poster.userid}
          />
        ))}
      </ul>
    );
  } else {
    return (
      <div className='place-list center'>
        <Card>
          <h2>No posters.</h2>
          <Button to="/posters/new">Share Poster</Button>
        </Card>
      </div>
    );
  }
};

export default PosterList;
