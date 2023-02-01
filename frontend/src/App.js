import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Users from './user/pages/Users';
import NewPoster from "./posters/pages/NewPoster";

function App () {
  return <Router>
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/posters/new" element={<NewPoster />} />
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
}

export default App;