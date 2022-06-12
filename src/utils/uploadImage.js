import axios from 'axios';

export const imageUploadMulti = async (images) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();
    formData.append('file', item);
    formData.append('upload_preset', `mern-posts-ultimate`);
    formData.append('cloud_name', `rangdradev`);

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/rangdradev/image/upload`,
      formData
    );

    imgArr.push(res.data.url);
  }
  return imgArr;
};

export const imageUploadSingle = async (image) => {
  let imgUrl = '';

  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', `mern-posts-ultimate`);
  formData.append('cloud_name', `rangdradev`);

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/rangdradev/image/upload`,
    formData
  );

  imgUrl = res.data.url;

  return imgUrl;
};
