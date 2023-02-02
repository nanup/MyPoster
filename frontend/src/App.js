import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import React from 'react';
import NewPoster from "./posters/pages/NewPoster";
import UserPosters from './posters/pages/UserPosters';
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Users from './user/pages/Users';

function App () {
  return <Router>
    <MainNavigation />
    <main>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:uid/posters" element={<UserPosters />} />
        <Route path="/posters/new" element={<NewPoster />} />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  </Router>
}

export default App;