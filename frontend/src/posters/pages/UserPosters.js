import React from "react";
import { useParams } from "react-router-dom";

import PosterList from "./PosterList";

const DUMMY_POSTERS = [
  {
    id: "p1",
    title: "In the Mood for Love",
    description: "Wong Kar Wai's colorful masterpiece",
    image: "https://i.redd.it/c03fqf6peuca1.jpg",
    year: 2000,
    trailerlink: "https://www.youtube.com/embed/m8GuedsQnWQ",
    userid: "u1"
  }
];

const UserPosters = () => {
  const userid = useParams().uid;
  const userPosters = DUMMY_POSTERS.filter(poster => poster.userid === userid)
  return <PosterList posters={userPosters} />
}

export default UserPosters;