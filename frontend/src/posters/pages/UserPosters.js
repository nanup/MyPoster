import React from "react";

import PosterList from "./PosterList";

const DUMMY_POSTERS = [
  {
    id: "p1",
    title: "In the Mood for Love",
    description: "Wong Kar Wai's colorful masterpiece",
    image: "https://i.redd.it/c03fqf6peuca1.jpg",
    year: 2000,
    imdblink: "https://www.imdb.com/title/tt0118694/",
    userid: "u1"
  }
];

const UserPosters = () => {
  return <PosterList posters={DUMMY_POSTERS} />
}

export default UserPosters;