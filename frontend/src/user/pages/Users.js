import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const DUMMY_USERS = [
    {
      id: "u1",
      image: "https://images.unsplash.com/flagged/photo-1566127992631-137a642a90f4",
      name: "Nanu Panchamurthy",
      posterCount: 69
    },
    {
      id: "u2",
      image: "https://images.unsplash.com/flagged/photo-1566127992631-137a642a90f4",
      name: "Akhil Kumar Tangi",
      posterCount: 420
    },
    {
      id: "u3",
      image: "https://images.unsplash.com/flagged/photo-1566127992631-137a642a90f4",
      name: "Anil Kumar Pappu",
      posterCount: 1.5
    }
  ];

  return <UsersList users={DUMMY_USERS} />
}

export default Users;