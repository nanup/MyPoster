import './NavLinks.css';

import { useContext } from 'react';

import { AuthContext } from '../../context/auth-context';
import Button from '../Form/Button';
import { NavLink } from 'react-router-dom';

const NavLinks = () => {
  const ctx = useContext(AuthContext);

  const logoutHandler = () => {
    ctx.logout();
  };
  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/'><Button>HOME</Button></NavLink>
      </li>
      {ctx.isLoggedIn && (
        <li>
          <NavLink to={`/${ctx.userId}/posters`}>
            <Button>MY POSTERS</Button>
          </NavLink>
        </li>
      )}
      {ctx.isLoggedIn && (
        <li>
          <NavLink to='/posters/new'><Button>ADD POSTER</Button></NavLink>
        </li>
      )}
      {!ctx.isLoggedIn && (
        <li>
          <NavLink to='/auth'><Button>LOGIN</Button></NavLink>
        </li>
      )}
      {ctx.isLoggedIn && (
        <li>
          <Button inverse onClick={logoutHandler}>LOGOUT</Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
