import {
  PencilIcon,
  TrashIcon,
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid,
} from '@heroicons/react/solid';
import {
  AnnotationIcon,
  PaperAirplaneIcon,
  BookmarkIcon as BookmarkIconOutline,
  HeartIcon as HeartIconOutline,
} from '@heroicons/react/outline';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from 'swiper';
import { useDispatch, useSelector } from 'react-redux';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import CommentItem from './CommentItem';

import {
  createComment,
  deletePost,
  likePost,
  setCurrentId,
} from 'redux/features/postSlice';
import { savePost } from 'redux/features/userSlice';

dayjs.extend(relativeTime);

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { loading } = useSelector((state) => state.posts);

  let [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState('');

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleSubmitComment = (e) => {
    e.preventDefault();
    dispatch(createComment({ comment, id: post._id }));
    setComment('');
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-xl">
      {post.imagePost.length > 0 && (
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {post.imagePost.map((img) => (
            <SwiperSlide className="cursor-pointer" key={img}>
              <img
                src={img}
                key={img}
                alt={img}
                className="object-cover h-[300px] rounded-lg w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="flex items-center justify-between my-2">
        <div className="flex items-center space-x-3">
          {user && post?.likes.some((likeId) => likeId === user?._id) ? (
            <button onClick={() => dispatch(likePost(post._id))}>
              <HeartIconSolid className="w-8 h-8 text-red-500 duration-custom" />
            </button>
          ) : (
            <button onClick={() => dispatch(likePost(post._id))}>
              <HeartIconOutline className="w-8 h-8 text-gray-800 hover:text-red-500 duration-custom" />
            </button>
          )}

          <button onClick={openModal}>
            <AnnotationIcon className="w-8 h-8 text-gray-800 hover:text-purple-500 duration-custom" />
          </button>
          <button>
            <PaperAirplaneIcon className="w-8 h-8 text-gray-800 rotate-45 hover:text-purple-500 duration-custom" />
          </button>
        </div>
        <div className="flex items-center px-3 py-1 space-x-2 text-white bg-purple-500 rounded-md">
          {user?.username === post?.postedBy?.username && (
            <>
              <button onClick={() => dispatch(deletePost(post._id))}>
                <TrashIcon className="w-6 h-6 hover:text-red-500" />
              </button>
              <button onClick={() => dispatch(setCurrentId(post._id))}>
                <PencilIcon className="w-6 h-6 hover:text-blue-500" />
              </button>
            </>
          )}

          <button onClick={() => dispatch(savePost(post._id))}>
            {user?.savedPosts.some((save) => save._id === post._id) ? (
              <BookmarkIconSolid className="w-6 h-6 text-white hover:text-gray-600" />
            ) : (
              <BookmarkIconOutline className="w-6 h-6 hover:text-gray-600" />
            )}
          </button>
        </div>
      </div>
      <div className="flex items-center mb-2 space-x-3">
        <p className="text-xs text-gray-400">{post?.likes.length} likes</p>
        <p className="text-xs text-gray-400">
          {post?.comments.length} comments
        </p>
      </div>

      <div className="flex items-center space-x-2 text-sm">
        <img
          src={user?.pic}
          className="object-cover w-8 h-8 rounded-full"
          alt={user?.username}
        />
        <p>
          <Link
            to={`${
              post?.postedBy?.username === user?.username
                ? '/profile'
                : `/profile/${post?.postedBy?.username}`
            }`}
            className="font-bold"
          >
            {post?.postedBy?.username}
          </Link>{' '}
          {post?.body}
        </p>
      </div>
      <p className="mt-2 text-xs font-light text-gray-400">
        {dayjs(post?.createdAt).fromNow()}
      </p>
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
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl h-[80vh] flex flex-col rounded-2xl">
                  <div className="space-y-3" style={{ flex: 1 }}>
                    {post?.comments.length > 0 ? (
                      post?.comments.map((comment) => (
                        <CommentItem
                          comment={comment}
                          key={comment._id}
                          postId={post._id}
                        />
                      ))
                    ) : (
                      <p>Tidak ada komentar</p>
                    )}
                  </div>
                  <form
                    onSubmit={handleSubmitComment}
                    className="flex items-center justify-between px-3 py-2 bg-gray-300 rounded-full"
                  >
                    <input
                      type="text"
                      name="comment"
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Tulis komentar..."
                      style={{ flex: 1 }}
                      className="bg-transparent outline-none"
                    />
                    <button>
                      <PaperAirplaneIcon
                        disabled={loading}
                        className="w-5 h-5 text-gray-700 rotate-45 disabled:text-gray-300 hover:text-gray-900"
                      />
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Post;
