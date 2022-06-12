const UserFollowing = ({ user }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <img
          src={user?.pic}
          className="object-cover w-12 h-12 rounded-full"
          alt={user?.username}
        />
        <div>
          <p className="text-sm font-bold leading-4 text-gray-800">
            {user?.fullname}
          </p>
          <p className="text-xs text-gray-400">@{user?.username}</p>
        </div>
      </div>

      <button className="px-3 py-1 text-sm text-white rounded-md bg-custom">
        Follow
      </button>
    </div>
  );
};

export default UserFollowing;
