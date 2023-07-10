import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  Autocomplete,
  Typography,
  CircularProgress,
} from '@mui/material';

import "./style.css"

import Chatbot from './Chatbot';

import image1 from './image1.png';
import image2 from './image2.png';
import image3 from './image3.png';
import image4 from './image4.png';

const imageList = [image1, image2, image3, image4];

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        {/* Left Side */}
        <Grid item xs={8}>
          <Typography variant="h5" sx={{ textAlign: 'center', paddingTop: 4, marginBottom: 6 }}>
            Image List
          </Typography>
          <Grid container spacing={10}>
            {imageList.map((image, index) => (
              <Grid item xs={6} key={index}>
                <Box
                  onClick={() => handleImageClick(image)}
                  sx={{
                    width: '100%',
                    height: 0,
                    paddingBottom: '75%',
                    position: 'relative',
                    border: selectedImage === image ? '7px solid red' : 'none',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginBottom: '-50px', // Add spacing between images
                  }}
                >
                  <img
                    src={image}
                    alt={`Image ${index}`}
                    style={{
                      position: 'absolute',
                      width: '100%', // Adjust the width of the image
                      top: 0,
                      left: 0,
                      objectFit: 'cover',
                      borderRadius: '10px',
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Side */}
        <Grid item xs={4}>
          <Grid container direction="column" spacing={2} height="100%">
            <Grid item sx={{ flexGrow: 1 }}>
              <Typography variant="h5" sx={{ textAlign: 'center', paddingTop: 4, marginBottom: 2 }}>
                Selected Image
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  height: 0,
                  paddingBottom: '75%',
                  position: 'relative',
                }}
              >
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected Image"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      top: 0,
                      left: 0,
                      objectFit: 'contain',
                      borderRadius: '10px',
                    }}
                  />
                ) : (
                  // now we need a centered text both horizontally and vertically with a message saying that "Please select an image before asking your question", so we need to use Typography
                  <Typography variant="h4" sx={{ textAlign: 'center', padding: 10, position: 'relative', top: '50%', transform: 'translateY(10%)' }}>
                  Please select an image before asking your question
                  </ Typography>
                )}
              </Box>
            </Grid>

            {/* Chatbot */}
            <Grid item>
              <Chatbot selectedImage={selectedImage} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;