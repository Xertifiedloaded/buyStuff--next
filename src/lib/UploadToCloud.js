import axios from 'axios';
import React from 'react'
const CLOUDINARY_UPLOAD_PRESET = 'iboyi7t9'; 
const cloudName = 'dpn9svwqm';
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

export const handleImageUpload = async (file) => {
  if (!file) return '';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
    return response.data.secure_url;
  } catch (error) {
    console.error('Image upload failed:', error);
    return '';
  }
};



