import './Navigation.css';

import { Fragment, useState } from 'react';

import Backdrop from '../UI/Backdrop';
import { Link } from 'react-router-dom';
import Header from './Header';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';

const Navigation = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawerHandler = () => {
    setDrawerVisible(true);
  };

  const hideDrawerHandler = () => {
    setDrawerVisible(false);
  };

  return (
    <Fragment>
      {drawerVisible && <Backdrop onClick={hideDrawerHandler} />}
      <SideDrawer onClick={hideDrawerHandler} visible={drawerVisible}>
        <nav className='drawer-navigation-links'>
          <NavLinks />
        </nav>
      </SideDrawer>
      <Header>
        <button
          name='drawer-button'
          onClick={showDrawerHandler}
          className='drawer-button'>
          <span />
          <span />
          <span />
        </button>
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
