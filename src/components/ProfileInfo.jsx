import { PencilIcon } from '@heroicons/react/outline';
import { BriefcaseIcon, LocationMarkerIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { logout, updateUser } from 'redux/features/userSlice';

const ProfileInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.users);
  const [data, setData] = useState({
    fullname: '',
    livesIn: '',
    workAt: '',
    bio: '',
  });
  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setData({
        ...data,
        fullname: user?.fullname || '',
        livesIn: user?.livesIn || '',
        workAt: user?.workAt || '',
        bio: user?.bio || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUser(data));
    if (error) {
      toast.error(error);
    } else {
      closeModal();
    }
  };
  return (
    <>
      <div className="p-4 my-4 flex justify-between flex-col h-[350px] bg-white shadow-md rounded-xl">
        <div className="flex items-center justify-between">
          <p className="font-bold text-gray-800">Your Info</p>
          <button onClick={openModal}>
            <PencilIcon className="w-6 h-6 text-gray-800 hover:text-purple-500" />
          </button>
        </div>
        <div
          style={{ flex: 1 }}
          className="mt-6 space-y-3 text-sm text-gray-800"
        >
          <p>
            <LocationMarkerIcon className="w-6 h-6 text-green-500" />
            <b>Lives in</b> {user?.livesIn || ' - '}
          </p>
          <p>
            <BriefcaseIcon className="w-6 h-6 text-blue-500" />
            <b>Works at</b> {user?.workAt || ' - '}
          </p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="px-5 py-1 text-sm text-white rounded-md bg-custom"
          >
            Log Out
          </button>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-md p-6 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-medium leading-6 text-gray-900"
                  >
                    Update Profile
                  </Dialog.Title>
                  {/* {error && <p className="text-red-500">{error}</p>} */}
                  <div className="mt-4">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-2">
                        <label htmlFor="fullname" className="block mb-1">
                          Fullname
                        </label>
                        <input
                          type="text"
                          name="fullname"
                          value={data.fullname}
                          onChange={handleChange}
                          className="w-full px-3 py-1 bg-gray-200 rounded-md outline-none"
                          placeholder="Your Fullname"
                        />
                      </div>
                      <div className="mb-2">
                        <label htmlFor="livesIn" className="block mb-1">
                          Lives In
                        </label>
                        <input
                          type="text"
                          name="livesIn"
                          value={data.livesIn}
                          onChange={handleChange}
                          className="w-full px-3 py-1 bg-gray-200 rounded-md outline-none"
                          placeholder="Your Lives"
                        />
                      </div>
                      <div className="mb-2">
                        <label htmlFor="workAt" className="block mb-1">
                          Work At
                        </label>
                        <input
                          type="text"
                          name="workAt"
                          value={data.workAt}
                          onChange={handleChange}
                          className="w-full px-3 py-1 bg-gray-200 rounded-md outline-none"
                          placeholder="Your Work Place"
                        />
                      </div>
                      <div className="mb-2">
                        <label htmlFor="bio" className="block mb-1">
                          Bio
                        </label>
                        <textarea
                          type="text"
                          name="bio"
                          value={data.bio}
                          onChange={handleChange}
                          className="w-full p-2 bg-gray-200 rounded-md outline-none"
                          placeholder="Your bio"
                          cols={8}
                        />
                      </div>
                      {/* <div className="mb-2">
                        <label htmlFor="password" className="block mb-1">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          required
                          value={data.password}
                          onChange={handleChange}
                          className="w-full px-3 py-1 bg-gray-200 rounded-md outline-none"
                          placeholder="Your Password"
                        />
                      </div> */}
                      <button
                        type="submit"
                        className="w-full py-2 mt-4 text-sm text-white rounded-md bg-custom"
                      >
                        {loading ? 'Mengupdate...' : 'Update'}
                      </button>
                    </form>
                  </div>
                  <button
                    onClick={closeModal}
                    className="absolute z-20 w-8 h-8 text-white bg-red-500 rounded-full hover:opacity-70 duration-custom -top-2 -right-2"
                  >
                    X
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ProfileInfo;
