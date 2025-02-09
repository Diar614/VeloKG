import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./components/pages/register/Register";
import Main from './components/pages/Main/Main';
import UserAccaunt from './components/pages/userAccaunt/UserAccount';
import './index.css';
import './fonts.css';
     
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/main" element={<Main />} />
        <Route path="/userAccaunt" element={<UserAccaunt />} />
      </Routes>
    </Router>
  );
}

export default App;