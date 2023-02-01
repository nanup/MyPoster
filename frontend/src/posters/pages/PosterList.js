import React from "react";
import PosterListItem from "./PosterListItem";

import Card from "../../shared/components/UIElements/Card";

import "./PosterList.css";

const PosterList = (props) => {
  if (props.posters.length !== 0) {
    return <ul className="place-list">
      {props.posters.map(poster => <PosterListItem
        key={poster.id}
        id={poster.id}
        image={poster.image}
        title={poster.title}
        year={poster.year}
        description={poster.description}
        trailerlink={poster.trailerlink}
        userid={poster.userid}
      />)}
    </ul>
  } else {
    return <div className="place-list center">
      <Card>
        <h2>No posters.</h2>
        <button>Share Poster</button>
      </Card>
    </div>
  }
}

export default PosterList;