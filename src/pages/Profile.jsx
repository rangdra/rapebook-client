import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LeftPart from 'parts/LeftPart';
import MiddlePart from 'parts/MiddlePart';
import RightPart from 'parts/RightPart';

import { getMyPosts } from 'redux/features/postSlice';

const Profile = () => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);
  return (
    <section className="flex gap-4 p-4">
      <LeftPart isProfile />
      <MiddlePart isProfile posts={posts} />
      <RightPart />
    </section>
  );
};

export default Profile;
