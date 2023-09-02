import './UsersListItem.css';

import Card from '../../shared/components/UI/Card';
import { Link } from 'react-router-dom';
import React from 'react';

const UsersListItem = (props) => {
  return (
    <li className='user-item'>
      <Card className='user-item__content'>
        <Link to={`/${props.id}/posters`}>
          <div className='user-item__info'>
            <h2>{props.name}</h2>
            <h3>
              {props.posterCount}{' '}
              {props.posterCount === 1 ? 'Poster' : 'Posters'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UsersListItem;
