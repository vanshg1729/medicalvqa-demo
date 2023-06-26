import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
  createTheme,
  ThemeProvider,
} from '@mui/material';

import datasetOptions from './data.json';

import image1 from './image1.png';
import image2 from './image2.png';
import image3 from './image3.png';
import image4 from './image4.png';
import image5 from './image5.png';

const theme = createTheme({
  typography: {
    fontFamily: 'Arial, sans-serif',
    fontSize: 18,
  },
});

const ImageList = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setSelectedQuestion(null);
    const selectedImageData = datasetOptions.images.find(
      (item) => item.image === image
    );
    setQuestions(selectedImageData ? selectedImageData.questions : []);
  };

  const handleQuestionClick = (question) => {
    setLoading(true);

    // Simulating API request delay
    setTimeout(() => {
      setSelectedQuestion(question);
      setLoading(false);
    }, 2000);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Box my={4} textAlign="center">
          <Typography variant="h4" component="h1">
            Medical VQA Demo
          </Typography>
          <Typography variant="h6" component="h6" my={2}>
            (click on the image to see the questions)
          </Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          <Grid item>
            <img
              src={image1}
              alt="Image 1"
              width="220"
              height="220"
              onClick={() => handleImageClick('image1.png')}
              style={{ cursor: 'pointer' }}
            />
          </Grid>
          <Grid item>
            <img
              src={image2}
              alt="Image 2"
              width="220"
              height="220"
              onClick={() => handleImageClick('image2.png')}
              style={{ cursor: 'pointer' }}
            />
          </Grid>
          <Grid item>
            <img
              src={image3}
              alt="Image 3"
              width="220"
              height="220"
              onClick={() => handleImageClick('image3.png')}
              style={{ cursor: 'pointer' }}
            />
          </Grid>
          <Grid item>
            <img
              src={image4}
              alt="Image 4"
              width="220"
              height="220"
              onClick={() => handleImageClick('image4.png')}
              style={{ cursor: 'pointer' }}
            />
          </Grid>
          <Grid item>
            <img
              src={image5}
              alt="Image 5"
              width="220"
              height="220"
              onClick={() => handleImageClick('image5.png')}
              style={{ cursor: 'pointer' }}
            />
          </Grid>
        </Grid>
        {selectedImage && (
          <Box my={4}>
            <Typography variant="h6" component="h2" align="center">
              Questions for {selectedImage}
            </Typography>
            {questions.map((question, index) => (
              <Box
                key={index}
                my={2}
                p={2}
                onClick={() => handleQuestionClick(question)}
                style={{
                  cursor: 'pointer',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: '#f0f0f0',
                }}
              >
                <Typography variant="body1" component="p">
                  {question.question}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
        {!loading && selectedQuestion && (
          <Box my={4}>
            <Typography variant="h6" component="h2" align="center">
              Answer for the Selected Question
            </Typography>
            <Box
              my={2}
              p={2}
              style={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: '#f0f0f0',
              }}
            >
              <Typography variant="body1" component="p" align="center">
                {selectedQuestion.answer}
              </Typography>
            </Box>
          </Box>
        )}
        {loading && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default ImageList;
