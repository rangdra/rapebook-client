import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LeftPart from 'parts/LeftPart';
import MiddlePart from 'parts/MiddlePart';
import RightPart from 'parts/RightPart';

import { getPosts } from 'redux/features/postSlice';

const Home = () => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <section className="flex gap-4 p-4">
      <LeftPart />
      <MiddlePart posts={posts} />
      <RightPart />
    </section>
  );
};

export default Home;
