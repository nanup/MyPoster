import React from "react";

import UsersListItem from "./UsersListItem";
import Card from "../../shared/components/UIElements/Card";
import "./UsersList.css";

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
      <Card>
        <h2>No users found.</h2>
      </Card>
    </div>
  }
}

export default UsersList;