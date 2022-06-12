import { AcademicCapIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { login } from 'redux/features/userSlice';

const Login = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const { error, loading, user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataLogin = {
      username: data.username,
      password: data.password,
    };
    dispatch(login(dataLogin));
    if (error) {
      toast.error(error);
      return;
    } else {
      navigate('/home');
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="items-center p-4 md:space-x-8 md:flex md:p-0">
        <div className="flex items-center justify-center mb-4 space-x-2 md:justify-start md:mb-0">
          <h1 className="text-4xl font-bold text-purple-500">rapebook</h1>
          <AcademicCapIcon className="w-12 h-12 text-purple-500" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-4 bg-white shadow-md md:w-5/12 rounded-xl"
        >
          <h1 className="mb-6 text-lg font-semibold text-center">Log In</h1>
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 bg-gray-200 rounded-md outline-none"
            placeholder="Username"
          />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-200 rounded-md outline-none"
            placeholder="Password"
          />
          <div className="flex items-end justify-between mt-4">
            <p className="text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-500 underline">
                Register
              </Link>
            </p>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-bold text-white rounded-md disabled:opacity-30 bg-custom"
            >
              {loading ? 'Loading...' : 'Log In'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
