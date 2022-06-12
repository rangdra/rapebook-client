import { CameraIcon } from '@heroicons/react/outline';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Loading from './Loading';

import { updateUser } from 'redux/features/userSlice';
import { imageUploadSingle } from 'utils/uploadImage';

const CardProfile = ({ isProfile }) => {
  const { user } = useSelector((state) => state.users);
  const { posts } = useSelector((state) => state.posts);
  const [imgHover, setImgHover] = useState(false);
  const [coverHover, setCoverHover] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const coverRef = useRef(null);

  const uploadPic = async (e) => {
    setLoading(true);
    const url = await imageUploadSingle(e.target.files[0]);
    dispatch(updateUser({ pic: url }));
    setLoading(false);
  };

  const uploadCover = async (e) => {
    setLoading(true);
    const url = await imageUploadSingle(e.target.files[0]);
    dispatch(updateUser({ cover: url }));
    setLoading(false);
  };

  return (
    <div className="pb-2 my-4 overflow-hidden bg-white shadow-md rounded-xl h-max">
      {loading && <Loading />}
      <div
        className="relative  w-full h-[170px] cursor-pointer"
        onMouseEnter={() => setCoverHover(true)}
        onMouseLeave={() => setCoverHover(false)}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={coverRef}
          onChange={uploadCover}
        />
        <img src={user?.cover} className="object-cover w-full h-full " alt="" />
        {coverHover && (
          <button
            onClick={() => coverRef.current.click()}
            className="absolute inset-0 flex flex-col items-center justify-center w-full h-full text-white bg-black/50 "
          >
            <CameraIcon className="w-10 h-10 text-white" />
            <span className="">Ganti Cover</span>
          </button>
        )}
      </div>

      <div className="flex flex-col items-center justify-center">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileRef}
          onChange={uploadPic}
        />
        <div
          className="relative w-24 h-24 mb-4 -mt-10 overflow-hidden rounded-full cursor-pointer"
          onMouseEnter={() => setImgHover(true)}
          onMouseLeave={() => setImgHover(false)}
        >
          <img
            src={user?.pic}
            className="object-cover w-full h-full"
            alt={user?.username}
          />
          {imgHover && (
            <button
              onClick={() => fileRef.current.click()}
              className="absolute bottom-0 left-0 right-0 flex flex-col items-center w-full px-1 text-white bg-black/50 h-1/2"
            >
              <CameraIcon className="w-6 h-6 text-white" />
              <span className="text-[10px]">Ganti Picture</span>
            </button>
          )}
        </div>

        <p className="text-lg font-bold">{user?.fullname}</p>
        <p className="text-lg font-light">{user?.bio || ' - '}</p>
      </div>
      <div className="flex items-center py-2 my-4 border-t-2 border-b-2 border-gray-300 divide-x-2 divide-gray-300">
        <div className="w-1/2 py-2">
          <p className="font-bold text-center">{user?.followers.length}</p>
          <p className="text-center text-gray-300">Followers</p>
        </div>
        <div className="w-1/2 py-2">
          <p className="font-bold text-center">{user?.following.length}</p>
          <p className="text-center text-gray-300">Following</p>
        </div>
        {isProfile && (
          <div className="w-1/2 py-2">
            <p className="font-bold text-center">{posts?.length}</p>
            <p className="text-center text-gray-300">Posts</p>
          </div>
        )}
      </div>
      {!isProfile && (
        <Link
          to="/profile"
          className="block pb-2 text-lg font-bold text-center text-purple-500"
        >
          My Profile
        </Link>
      )}
    </div>
  );
};

export default CardProfile;
