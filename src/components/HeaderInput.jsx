import { AcademicCapIcon, SearchIcon } from '@heroicons/react/solid';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HeaderInput = () => {
  const [username, setUsername] = useState('');
  const [searchResponse, setSearchResponse] = useState({
    isLoading: false,
    isError: false,
    data: null,
  });

  let timeoutSearch = useRef(null);
  const handleSearch = (e) => {
    e.persist();
    setUsername(e.target.value);
    clearTimeout(timeoutSearch.current);
    timeoutSearch.current = setTimeout(() => {
      axios
        .get(`/users?username=${username}`)
        .then((res) => {
          setSearchResponse({
            isLoading: false,
            isError: false,
            data: res.data,
          });
        })
        .catch((err) => {
          setSearchResponse({
            isLoading: false,
            isError: true,
            data: null,
          });
        });
    }, 1000);
  };
  return (
    <div className="flex items-center space-x-2">
      <Link to="/home">
        <AcademicCapIcon className="w-12 h-12 text-purple-500" />
      </Link>
      <div className="relative flex items-center justify-between px-2 py-1 rounded-lg bg-slate-200">
        <input
          type="text"
          className="bg-transparent outline-none"
          placeholder="Cari User"
          value={username}
          onChange={handleSearch}
          style={{ flex: 1 }}
        />
        <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-custom">
          <SearchIcon className="w-8 h-8 text-white hover:text-purple-500" />
        </button>
        {searchResponse.data && (
          <div className="absolute left-0 z-10 w-full bg-white rounded-lg shadow-md top-14">
            {searchResponse.isLoading ? (
              <p>Loading...</p>
            ) : searchResponse.data.length > 0 ? (
              searchResponse.data.map((user) => (
                <Link
                  to={`/profile/${user?.username}`}
                  key={user?.username}
                  className="flex items-center px-4 py-2 space-x-2 hover:bg-gray-100"
                >
                  <img
                    src={user?.pic}
                    className="object-cover w-10 h-10 rounded-full"
                    alt={user?.username}
                  />
                  <div>
                    <p className="text-sm font-bold leading-4 tracking-wide text-gray-800">
                      {user?.fullname}
                    </p>
                    <p className="text-xs text-gray-500">@{user?.username}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="px-4 py-2 text-sm">
                User dengan username:{username} tidak tersedia{' '}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderInput;
