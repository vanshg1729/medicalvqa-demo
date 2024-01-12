// src/App.js

import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

function App() {
  const [uploadedImagePath, setUploadedImagePath] = useState('');
  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append('image', acceptedFiles[0]);

    try {
      const response = await axios.post('http://localhost:5001/upload', formData); // Update the port to 5001
      setUploadedImagePath(response.data.imagePath);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <h1>Image Upload App</h1>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select one</p>
      </div>
      {uploadedImagePath && (
        <div>
          <h2>Uploaded Image</h2>
          <img src={`http://localhost:5001/${uploadedImagePath}`} alt="Uploaded" style={imageStyle} />
        </div>
      )}
    </div>
  );
}

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

const imageStyle = {
  maxWidth: '100%',
  maxHeight: '300px',
  marginTop: '20px',
};

export default App;
