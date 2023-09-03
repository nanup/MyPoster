import './Navigation.css';

import { Fragment } from 'react';

import { Link } from 'react-router-dom';
import Header from './Header';
import NavLinks from './NavLinks';

const Navigation = () => {
  return (
    <Fragment>
      <h1 className='titleTop'>
        <Link to='/'>
          <strong>POSTERATI</strong>
        </Link>
      </h1>
      <Header>
        <h1 className='title'>
          <Link to='/'>
            <strong>POSTERATI</strong>
          </Link>
        </h1>
        <nav className='main-navigation-links'>
          <NavLinks />
        </nav>
      </Header>
    </Fragment>
  );
};

export default Navigation;
