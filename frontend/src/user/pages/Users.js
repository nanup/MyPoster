import { Fragment, useEffect, useState } from 'react';

import ErrorModal from './../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from './../../shared/components/UIElements/LoadingSpinner';
import UsersList from '../components/UsersList';
import { useHttpClient } from '../../shared/hooks/httpHook';

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_API_URL + '/users',
          'GET',
          null,
          {}
        );

        setUsers(responseData.users);
      } catch (err) {}
    };

    fetchUsers();
  }, [sendRequest]);

  return (
    <Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && users && <UsersList users={users} />}
    </Fragment>
  );
};

export default Users;
