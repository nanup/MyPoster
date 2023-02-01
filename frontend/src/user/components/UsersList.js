import React from "react";

import "./UsersList.css";
import UsersListItem from "./UsersListItem";

const UsersList = (props) => {
  if (props.users.length !== 0) {
    return <ul className="users-list">
      {props.users.map((user) => {
        return <UsersListItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          posterCount={user.posterCount} />
      })}
    </ul>
  } else {
    return <div className="center">
      <h2>No users found.</h2>
    </div>
  }
}

export default UsersList;