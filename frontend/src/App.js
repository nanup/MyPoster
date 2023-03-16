import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";

import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/components/FormElements/context/auth-context";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NewPoster from "./posters/pages/NewPoster";
import UpdatePoster from "./posters/pages/UpdatePoster";
import UserPosters from "./posters/pages/UserPosters";
import Users from "./user/pages/Users";

let logoutTimer;

function App() {
  const [token, setToken] = useState("");
  const [tokenExpireDate, setTokenExpireDate] = useState();
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpireDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpireDate(tokenExpireDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expireDate: tokenExpireDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpireDate();
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expireDate) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expireDate)
      );
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpireDate) {
      const timeLeft = tokenExpireDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, timeLeft);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpireDate]);

  let routes;

  if (token) {
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
        isLoggedIn: !!token,
        token: token,
        userId: userId,
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
