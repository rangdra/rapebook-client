import { Tab } from '@headlessui/react';
import { BriefcaseIcon, LocationMarkerIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import RightPart from 'parts/RightPart';
import HeaderInput from 'components/HeaderInput';
import Post from 'components/Post';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ProfileUser = () => {
  const params = useParams();
  const [user, setUser] = useState(null);
  const { posts } = useSelector((state) => state.posts);
  const usernamePosts = posts.filter(
    (post) => post.postedBy.username === user?.username
  );
  console.log(usernamePosts);
  const [show, setShow] = useState(false);
  const showScroll = () => {
    if (window.innerWidth >= 768) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    showScroll();
  }, []);

  window.addEventListener('resize', showScroll);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`/users/find/${params.username}`);
      setUser(res.data);
    };

    getUser();
  }, [params.username]);
  return (
    <section className="flex gap-4 p-4">
      <div className="hidden md:block" style={{ flex: 1 }}>
        <HeaderInput />
        <div className="p-4 my-4 flex justify-between flex-col h-[350px] bg-white shadow-md rounded-xl">
          <p className="font-bold text-gray-800">Your Info</p>

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
        </div>
      </div>
      <>
        <div
          className={[
            'h-screen overflow-y-scroll',
            show ? 'scrollbar-custom' : 'no-scrollbar',
          ].join(' ')}
          style={{ flex: 2 }}
        >
          <div className="pb-2 my-4 overflow-hidden bg-white shadow-md rounded-xl h-max">
            <img
              src={user?.cover}
              className="object-cover w-full h-[170px]"
              alt=""
            />

            <div className="flex flex-col items-center justify-center">
              <div className="w-24 h-24 mb-4 -mt-10 overflow-hidden rounded-full">
                <img
                  src={user?.pic}
                  className="object-cover w-full h-full"
                  alt={user?.username}
                />
              </div>

              <p className="text-lg font-bold">{user?.fullname}</p>
              <p className="text-lg font-light">{user?.bio || ' - '}</p>
            </div>
            <div className="flex items-center py-2 my-4 border-t-2 border-b-2 border-gray-300 divide-x-2 divide-gray-300">
              <div className="w-1/2 py-2">
                <p className="font-bold text-center">
                  {user?.followers.length}
                </p>
                <p className="text-center text-gray-300">Followers</p>
              </div>
              <div className="w-1/2 py-2">
                <p className="font-bold text-center">
                  {user?.following.length}
                </p>
                <p className="text-center text-gray-300">Following</p>
              </div>

              <div className="w-1/2 py-2">
                <p className="font-bold text-center">{usernamePosts?.length}</p>
                <p className="text-center text-gray-300">Posts</p>
              </div>
            </div>
          </div>
          <Tab.Group>
            <Tab.List className="flex p-1 mx-2 space-x-1 bg-purple-500 rounded-xl">
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'outline-none',
                    selected
                      ? 'bg-white shadow text-purple-500'
                      : 'text-white hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                John Posts
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel className="space-y-4">
                {usernamePosts?.length > 0 ? (
                  usernamePosts?.map((post) => (
                    <Post post={post} key={post._id} />
                  ))
                ) : (
                  <p>Tidak ada postingan!</p>
                )}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </>
      <RightPart />
    </section>
  );
};

export default ProfileUser;
