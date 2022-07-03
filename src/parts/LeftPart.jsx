import { Dialog, Transition } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/solid';
import { useSelector } from 'react-redux';
import { Fragment, useState } from 'react';

import HeaderInput from 'components/HeaderInput';
import UserFollowing from 'components/UserFollowing';
import CardProfile from 'components/CardProfile';
import MyFollowing from 'components/MyFollowing';
import ProfileInfo from 'components/ProfileInfo';

const LeftPart = ({ isProfile }) => {
  let [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.users);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="hidden md:block" style={{ flex: 1 }}>
      <HeaderInput />
      {isProfile ? <ProfileInfo /> : <CardProfile />}
      <MyFollowing />
      <button
        onClick={openModal}
        className="block w-full text-center text-purple-500"
      >
        Show more
      </button>
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
            <div className="flex items-start justify-center min-h-full p-4 mt-20 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-1/2 px-4 pt-16 pb-4 text-left bg-white shadow-md rounded-xl">
                  <div>
                    <h2 className="mb-4 font-bold text-gray-800">
                      Who is following you
                    </h2>
                    {user?.followers.length > 0 ? (
                      user?.followers.map((item) => (
                        <UserFollowing user={item} key={item._id} />
                      ))
                    ) : (
                      <p>-</p>
                    )}
                  </div>
                  <button
                    onClick={closeModal}
                    className="absolute -top-2 -right-2 hover:opacity-60 duration-custom"
                  >
                    <XCircleIcon className="w-8 h-8 text-red-500" />
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default LeftPart;
