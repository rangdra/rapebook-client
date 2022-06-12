import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';

import Home from 'pages/Home';
import Login from 'pages/Login';
import Profile from 'pages/Profile';
import Register from 'pages/Register';
import ProfileUser from 'pages/ProfileUser';

import { getUserLogin } from 'redux/features/userSlice';

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      dispatch(getUserLogin());
    }
  }, [dispatch, token]);

  return (
    <div className=" bg-gradient-to-tr from-white to-indigo-50">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:username" element={<ProfileUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
