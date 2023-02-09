import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import NewPoster from "./posters/pages/NewPoster";
import UpdatePoster from "./posters/pages/UpdatePoster";
import UserPosters from "./posters/pages/UserPosters";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Auth from "./user/pages/Auth";
import Users from "./user/pages/Users";
import { AuthContext } from "./shared/components/FormElements/context/auth-contex";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <React.Fragment>
        <Route path='/' element={<Users />} />
        <Route path='/:uid/posters' element={<UserPosters />} />
        <Route element={<Navigate to='/auth' replace />} />
        <Route path='/posters/new' element={<NewPoster />} />
        <Route path='/*' element={<Navigate to='/' replace />} />
        <Route path='/posters/:posterId' element={<UpdatePoster />} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path='/' element={<Users />} />
        <Route path='/:uid/posters' element={<UserPosters />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/*' element={<Navigate to='/auth' replace />} />
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
      }}>
      <Router>
        <MainNavigation />
        <main>
          <Routes>{routes}</Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
