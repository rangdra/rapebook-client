import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './index.css';

import Home from 'pages/Home';
import Login from 'pages/Login';
import Profile from 'pages/Profile';
import Register from 'pages/Register';
import ProfileUser from 'pages/ProfileUser';

import { getUserLogin } from 'redux/features/userSlice';

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
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
          <Route
            path="/home"
            element={
              <ProtectedRoute user={user}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:username"
            element={
              <ProtectedRoute user={user}>
                <ProfileUser />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
