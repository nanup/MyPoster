import './UsersList.css';

import UsersListItem from './UsersListItem';

const UsersList = (props) => {
  if (props.users.length !== 0) {
    return (
      <ul className='users-list'>
        {props.users.map((user) => {
          return (
            <UsersListItem
              key={user._id}
              id={user._id}
              username={user.username}
              posterCount={user.posters.length}
            />
          );
        })}
      </ul>
    );
  } else {
    return (
      <div>
        <h2>No users found.</h2>
      </div>
    );
  }
};

export default UsersList;
