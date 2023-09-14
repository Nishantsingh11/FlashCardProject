// ImageInput.js
import React, { useState } from 'react';

const ImageInput = ({ onImageAdd }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = () => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageAdd(event.target.result);
      };
      reader.readAsDataURL(selectedImage);
      setSelectedImage(null);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <div>
          <img src={URL.createObjectURL(selectedImage)} alt="Preview" style={{ maxWidth: '200px' }} />
        </div>
      )}
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default ImageInput;
