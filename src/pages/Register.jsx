import { AcademicCapIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { register } from 'redux/features/userSlice';

const Register = () => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const { error, loading, user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error('Password harus sama!');
    } else {
      const dataRegister = {
        fullname: `${data.firstName} ${data.lastName}`,
        username: data.username,
        password: data.password,
      };
      dispatch(register(dataRegister));
      if (error) {
        toast.error(error);
      } else {
        toast.success('Register berhasil, silahkan login!');
        setData({
          ...data,
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          confirmPassword: '',
        });
      }
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
          className="p-4 bg-white shadow-md md:w-6/12 rounded-xl"
        >
          <h1 className="mb-6 text-lg font-semibold text-center">Register</h1>
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
              required
              className="w-1/2 px-4 py-2 mb-4 bg-gray-200 rounded-md outline-none"
              placeholder="First Name"
            />{' '}
            <input
              type="text"
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
              required
              className="w-1/2 px-4 py-2 mb-4 bg-gray-200 rounded-md outline-none"
              placeholder="Last Name"
            />
          </div>
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mb-4 bg-gray-200 rounded-md outline-none"
            placeholder="Username"
          />
          <div className="flex items-center gap-2">
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-200 rounded-md outline-none"
              placeholder="Password"
            />
            <input
              type="password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-200 rounded-md outline-none"
              placeholder="Confirm Password"
            />
          </div>

          <div className="flex items-end justify-between mt-4">
            <p className="text-sm">
              Already have an account?{' '}
              <Link to="/" className="text-blue-500 underline">
                Log In
              </Link>
            </p>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-bold text-white rounded-md disabled:opacity-30 bg-custom"
            >
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
