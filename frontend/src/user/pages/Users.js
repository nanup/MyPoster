import { Fragment, useEffect, useState } from 'react';

import ErrorModal from './../../shared/components/UI/ErrorModal';
import UsersList from '../components/UsersList';
import { useHttpClient } from '../../shared/hooks/httpHook';

const Users = () => {
  const { error, sendRequest, clearError } = useHttpClient();
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
      <ErrorModal error={error} onClear={clearError} />
      { users && <UsersList users={users} />}
    </Fragment>
  );
};

export default Users;
