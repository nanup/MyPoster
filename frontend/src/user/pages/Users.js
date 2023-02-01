import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const DUMMY_USERS = [
    {
      id: "u1",
      image: "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      name: "Nanu Panchamurthy",
      posterCount: 69
    },
    {
      id: "u2",
      image: "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      name: "Akhil Kumar Tangi",
      posterCount: 420
    },
    {
      id: "u3",
      image: "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      name: "Anil Kumar Pappu",
      posterCount: 1
    }
  ];

  return <UsersList users={DUMMY_USERS} />
}

export default Users;