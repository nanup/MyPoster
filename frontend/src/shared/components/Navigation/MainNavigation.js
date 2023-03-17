import "./MainNavigation.css";

import React, { useState } from "react";

import Backdrop from "../UIElements/Backdrop";
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";

const MainNavigation = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawerHandler = () => {
    setDrawerVisible(true);
  };

  const hideDrawerHandler = () => {
    setDrawerVisible(false);
  };

  return (
    <React.Fragment>
      {drawerVisible && <Backdrop onClick={hideDrawerHandler} />}
      <SideDrawer onClick={hideDrawerHandler} visible={drawerVisible}>
        <nav className='main-navigation__drawer-nav'>
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button
          onClick={showDrawerHandler}
          className='main-navigation__menu-btn'>
          <span />
          <span />
          <span />
        </button>
        <h1 className='main-navigation__title'>
          <Link to='/'>Posterati</Link>
        </h1>
        <nav className='main-navigation__header-nav'>
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
