import { useSelector } from 'react-redux';

import UserFollowing from 'components/UserFollowing';

const MyFollowing = () => {
  const { user } = useSelector((state) => state.users);

  return (
    <div className="mt-8 mb-4">
      <h2 className="mb-4 font-bold text-gray-800">Who is following you</h2>
      {user?.followers.length > 0 ? (
        user?.followers.map((item) => (
          <UserFollowing user={item} key={item._id} />
        ))
      ) : (
        <p>-</p>
      )}
    </div>
  );
};

export default MyFollowing;
