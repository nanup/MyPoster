import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";
import { AuthContext } from "./../FormElements/context/auth-contex";
import Button from "../FormElements/Button";

const NavLinks = (props) => {
  const ctx = useContext(AuthContext);

  const logoutHandler = () => {
    ctx.logout();
  };
  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/'>HOME</NavLink>
      </li>
      {ctx.isLoggedIn && (
        <li>
          <NavLink to='/u1/posters'>MY POSTERS</NavLink>
        </li>
      )}
      {ctx.isLoggedIn && (
        <li>
          <NavLink to='/posters/new'>ADD POSTER</NavLink>
        </li>
      )}
      {!ctx.isLoggedIn && (
        <li>
          <NavLink to='/auth'>LOGIN</NavLink>
        </li>
      )}
      {ctx.isLoggedIn && (
        <li>
          <Button onClick={logoutHandler}>
            LOGOUT
          </Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
