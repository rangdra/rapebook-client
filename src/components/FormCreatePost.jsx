import {
  PhotographIcon,
  VideoCameraIcon,
  LocationMarkerIcon,
  TableIcon,
} from '@heroicons/react/outline';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';

import { createPost, updatePost } from 'redux/features/postSlice';
import { imageUploadMulti } from 'utils/uploadImage';

const FormCreatePost = () => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { user } = useSelector((state) => state.users);
  const { currentId, posts } = useSelector((state) => state.posts);
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState('');
  const [images, setImages] = useState([]);

  const handleUploadInput = (e) => {
    let newImages = [];
    let num = 0;
    let err = '';
    const files = [...e.target.files];

    if (files.length === 0) return toast.error('Files does not exist.');

    files.forEach((file) => {
      if (file.size > 1024 * 1024)
        return (err = 'The largest image size is 1mb');

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        return (err = 'Image format is incorrect.');

      num += 1;
      if (num <= 5) newImages.push(file);
      return newImages;
    });

    if (err) toast.error(err);

    const imgCount = images.length;
    if (imgCount + newImages.length > 5)
      return toast.error('Select up to 5 images.');

    setImages([...images, ...newImages]);
  };

  const deleteImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  useEffect(() => {
    if (currentId) {
      const post = posts.find((post) => post._id === currentId);
      setBody(post.body);
      setImages(post.imagePost);
    }

    return () => {
      setBody('');
      setImages([]);
    };
  }, [currentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let media = [];
    const imgNewURL = images.filter((img) => !img.url);
    const imgOldURL = images.filter((img) => img.url);
    setLoading(true);

    if (imgNewURL.length > 0) media = await imageUploadMulti(imgNewURL);

    if (currentId) {
      dispatch(
        updatePost({ id: currentId, body, imagePost: [...imgOldURL, ...media] })
      );
    } else {
      dispatch(createPost({ body, imagePost: [...imgOldURL, ...media] }));
    }

    setBody('');
    setImages([]);
    setLoading(false);
  };

  return (
    <>
      <div className="flex p-4 mb-6 space-x-3 bg-white shadow-md rounded-xl">
        <img
          src={user?.pic}
          className="object-cover w-12 h-12 rounded-full"
          alt={user?.username}
        />
        <div className="w-full">
          <input
            type="text"
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            name="body"
            className="w-full px-4 py-2 rounded-lg outline-none bg-slate-200"
            placeholder="What's Happening?"
          />
          <div className="flex items-center justify-between pt-4 pl-4">
            <button
              className="flex items-center group"
              onClick={() => fileRef.current.click()}
            >
              <PhotographIcon className="w-5 h-5 mr-[2px] text-green-500 group-hover:opacity-60" />
              <p className="text-sm text-green-500 group-hover:opacity-60">
                Photo
              </p>
            </button>
            <button className="flex items-center group">
              <VideoCameraIcon className="w-5 h-5 mr-[2px] text-blue-500 group-hover:opacity-60" />
              <p className="text-sm text-blue-500 group-hover:opacity-60">
                Video
              </p>
            </button>{' '}
            <button className="flex items-center group">
              <LocationMarkerIcon className="w-5 h-5 mr-[2px] text-red-500 group-hover:opacity-60" />
              <p className="text-sm text-red-500 group-hover:opacity-60">
                Location
              </p>
            </button>{' '}
            <button className="flex items-center group">
              <TableIcon className="w-5 h-5 mr-[2px] text-yellow-500 group-hover:opacity-60" />
              <p className="text-sm text-yellow-500 group-hover:opacity-60">
                Schedule
              </p>
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-3 py-2 disabled:text-gray-500 disabled:border-gray-300 disabled:bg-gray-100 text-sm text-white rounded-md bg-custom"
            >
              {loading ? 'Memposting...' : 'Share'}
            </button>
          </div>
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-4 my-2">
              {images.map((img, index) => (
                <div className="relative cursor-pointer" key={index}>
                  <img
                    src={currentId ? img : URL.createObjectURL(img)}
                    alt="image"
                    className="object-cover w-full h-22 "
                  />

                  <button
                    onClick={() => deleteImage(index)}
                    className="absolute w-6 h-6 bg-gray-100 rounded-full hover:bg-red-500 hover:text-white -top-3 -right-2"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileRef}
          multiple
          onChange={handleUploadInput}
        />
      </div>
    </>
  );
};

export default FormCreatePost;
