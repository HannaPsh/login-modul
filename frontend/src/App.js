import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React, { useContext } from 'react';
import Navbar from './Components/Navbar';
import { ThemeContext } from './ThemeContext';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import PrivateRoute from './Components/PrivateRoute';
import RegisterPage from './Pages/RegisterPage';

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <Router>
      <div className={`container ${theme}`}>
        <Navbar />
        <div className="main">
          <Routes>
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={<PrivateRoute></PrivateRoute>}
            ></Route>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
          </Routes>
        </div>
        <div className="footer">Footer</div>
      </div>
    </Router>
  );
}

export default App;
