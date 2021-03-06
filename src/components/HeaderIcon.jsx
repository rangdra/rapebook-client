import { CogIcon, BellIcon, LogoutIcon } from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/outline';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from 'redux/features/userSlice';

const HeaderIcon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/');
  };
  return (
    <div className="flex items-center justify-between mb-10">
      <Link to="/home">
        <HomeIcon className="w-8 h-8 text-purple-500" />
      </Link>
      <Link to="/home">
        <CogIcon className="w-8 h-8 text-gray-800 hover:text-purple-500 duration-custom" />
      </Link>
      <Link to="/home">
        <BellIcon className="w-8 h-8 text-gray-800 hover:text-purple-500 duration-custom" />
      </Link>
      <button onClick={handleLogout}>
        <LogoutIcon className="w-8 h-8 text-red-500 duration-custom" />
      </button>
    </div>
  );
};

export default HeaderIcon;
