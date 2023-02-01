import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css"

const NavLinks = (props) => {
  return <ul className="nav-links">
    <li>
      <NavLink to="/">HOME</NavLink>
    </li>
    <li>
      <NavLink to="/u1/posters">MY POSTERS</NavLink>
    </li>
    <li>
      <NavLink to="/posters/new">ADD POSTER</NavLink>
    </li>
    <li>
      <NavLink to="/auth">AUTHENTICATE</NavLink>
    </li>
  </ul >
}

export default NavLinks;