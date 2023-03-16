import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import React, { useCallback, useState } from "react";

import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/components/FormElements/context/auth-context";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NewPoster from "./posters/pages/NewPoster";
import UpdatePoster from "./posters/pages/UpdatePoster";
import UserPosters from "./posters/pages/UserPosters";
import Users from "./user/pages/Users";

function App() {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

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
