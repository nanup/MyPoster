import React, { useEffect, useState } from "react";

import ErrorModal from "./../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "./../../shared/components/UIElements/LoadingSpinner";
import UsersList from "../components/UsersList";
import { useHttpClient } from "./../../shared/hooks/http-hook";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users",
          "GET",
          null,
          {}
        );

        setUsers(responseData.users);
      } catch (err) {}
    };

    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && users && <UsersList users={users} />}
    </React.Fragment>
  );
};

export default Users;
