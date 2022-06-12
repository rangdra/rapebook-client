import { Tab } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import CardProfile from 'components/CardProfile';
import FormCreatePost from 'components/FormCreatePost';
import Post from 'components/Post';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const MiddlePart = ({ isProfile, posts }) => {
  const { user } = useSelector((state) => state.users);
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

  return (
    <>
      <div
        className={[
          'h-screen overflow-y-scroll',
          show ? 'scrollbar-custom' : 'no-scrollbar',
        ].join(' ')}
        style={{ flex: 2 }}
      >
        {isProfile && <CardProfile isProfile />}
        <FormCreatePost />
        {isProfile ? (
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
                My Posts
              </Tab>{' '}
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
                Save Posts
              </Tab>{' '}
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel className="space-y-4">
                {posts?.length > 0 ? (
                  posts?.map((post) => <Post post={post} key={post._id} />)
                ) : (
                  <p>Tidak ada postingan!</p>
                )}
              </Tab.Panel>
              <Tab.Panel className="space-y-4">
                {user?.savedPosts?.length > 0 ? (
                  user?.savedPosts?.map((post) => (
                    <Post post={post} key={post._id} />
                  ))
                ) : (
                  <p>Tidak ada postingan!</p>
                )}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        ) : (
          <div className="space-y-4">
            {posts?.length > 0 ? (
              posts?.map((post) => <Post post={post} key={post._id} />)
            ) : (
              <p>Tidak ada postingan!</p>
            )}{' '}
          </div>
        )}
      </div>
    </>
  );
};

export default MiddlePart;
