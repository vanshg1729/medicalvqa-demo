import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';

const RandomAvatar = () => {
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const response = await axios.get('https://source.unsplash.com/random/100x100');
        setAvatarUrl(response.request.responseURL);
      } catch (error) {
        console.error('Error fetching random image:', error);
      }
    };

    fetchRandomImage();
  }, []);

  return (
    <div>
      {avatarUrl && (
        <Avatar src={avatarUrl} alt="Profile Image" sx={{ width: 150, height: 150, mb: 2, mx: 'auto' }} />
      )}
    </div>
  );
};

export default RandomAvatar;
