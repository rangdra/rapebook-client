import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import {
  PhotographIcon,
  VideoCameraIcon,
  LocationMarkerIcon,
  TableIcon,
} from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import HeaderIcon from 'components/HeaderIcon';
import Trends from 'components/Trends';

import { imageUploadMulti } from 'utils/uploadImage';
import { createPost } from 'redux/features/postSlice';

const RightPart = () => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentId, error } = useSelector((state) => state.posts);
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState('');
  const [images, setImages] = useState([]);
  const { user } = useSelector((state) => state.users);
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let media = [];
    const imgNewURL = images.filter((img) => !img.url);
    const imgOldURL = images.filter((img) => img.url);
    setLoading(true);

    if (imgNewURL.length > 0) media = await imageUploadMulti(imgNewURL);

    dispatch(createPost({ body, imagePost: [...imgOldURL, ...media] }));
    if (error) {
      toast.error(error);
      return;
    } else {
      closeModal();
      setBody('');
      setImages([]);
      setLoading(false);
    }
  };

  return (
    <div className="hidden md:block" style={{ flex: 1 }}>
      <HeaderIcon />
      <Trends />
      <div className="px-4">
        <button
          onClick={openModal}
          className="w-full py-3 text-white rounded-md shadow-md bg-custom"
        >
          Share
        </button>
      </div>

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
            <div className="flex items-start justify-center min-h-full p-4 mt-20 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative flex w-1/2 px-6 py-8 space-x-3 bg-white shadow-md rounded-xl">
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
                        className="px-3 py-2 text-sm text-white rounded-md bg-custom"
                      >
                        Share
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default RightPart;
