import './UsersListItem.css';

import { Link } from 'react-router-dom';

const UsersListItem = (props) => {
  return (
    <li className='user-item'>
      <div className='user-item-content'>
        <Link to={`/${props.id}/posters`}>
          <div className='user-item-info'>
            <h2>{props.username}</h2>
            <h3>
              {props.posterCount}{' '}
              {props.posterCount === 1 ? 'Poster' : 'Posters'}
            </h3>
          </div>
        </Link>
      </div>
    </li>
  );
};

export default UsersListItem;
