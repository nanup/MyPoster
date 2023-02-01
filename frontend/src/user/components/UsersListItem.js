import React from "react";
import Profile from "../../shared/components/UIElements/Profile"
import Card from "../../shared/components/UIElements/Card";
import { Link } from "react-router-dom";
import "./UsersListItem.css";

const UsersListItem = (props) => {
  return <li className="user-item">
    <Card className="user-item__content">
      <Link to={`/${props.id}/posters`}>
        <div className="user-item__image">
          <Profile
            image={props.image}
            alt={props.name}
          />
        </div>
        <div className="user-item__info">
          <h2>{props.name}</h2>
          <h3>{props.posterCount} {props.posterCount === 1 ? "Poster" : "Posters"}</h3>
        </div>
      </Link>
    </Card>
  </li>
}

export default UsersListItem;