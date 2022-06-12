import { useDispatch, useSelector } from 'react-redux';

import { deleteComment } from 'redux/features/postSlice';

const CommentItem = ({ comment, postId }) => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  return (
    <div className="flex space-x-2">
      <img
        src={comment?.commentBy?.pic}
        className="object-cover w-8 h-8 rounded-full"
        alt={comment?.commentBy?.username}
      />
      <div className="w-full">
        <div className="p-2 mb-1 bg-gray-200 rounded-md ">
          <p className="font-bold text-gray-900">
            {comment?.commentBy?.username}
          </p>
          <p className="text-sm leading-4 text-gray-600">{comment?.comment}</p>
        </div>
        <div className="flex items-center space-x-1 text-xs">
          <p>3 jam</p>
          {user?.username === comment?.commentBy?.username && (
            <button
              onClick={() =>
                dispatch(deleteComment({ commentId: comment._id, postId }))
              }
              className="text-red-500"
            >
              hapus
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
