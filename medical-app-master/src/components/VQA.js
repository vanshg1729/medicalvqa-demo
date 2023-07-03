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
  const [highlightedQuestion, setHighlightedQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false); // New state variable

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setSelectedQuestion(null);
    setHighlightedQuestion(null);
    const selectedImageData = datasetOptions.images.find(
      (item) => item.image === image
    );
    setQuestions(selectedImageData ? selectedImageData.questions : []);
    setShowAnswer(false); // Reset showAnswer state
  };

  const handleQuestionClick = (question) => {
    setHighlightedQuestion(question);
    setLoading(true);
    setShowAnswer(false); // Reset showAnswer state

    // Simulating API request delay
    setTimeout(() => {
      setSelectedQuestion(question);
      setLoading(false);
      setShowAnswer(true); // Set showAnswer state to true after delay
    }, 2000);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Box my={4} textAlign="center">
          <Typography variant="h4" component="h1">
            Image List App
          </Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12}>
            <Grid container spacing={4} justifyContent="center">
              <Grid item>
                <img
                  src={image1}
                  alt="Image 1"
                  width="220"
                  height="220"
                  onClick={() => handleImageClick('image1.png')}
                  style={{
                    cursor: 'pointer',
                    border: selectedImage === 'image1.png' ? '4px solid blue' : 'none',
                    borderRadius: '8px', // Add border radius for a rounded appearance
                  }}
                />
              </Grid>
              <Grid item>
                <img
                  src={image2}
                  alt="Image 2"
                  width="220"
                  height="220"
                  onClick={() => handleImageClick('image2.png')}
                  style={{
                    cursor: 'pointer',
                    border: selectedImage === 'image2.png' ? '4px solid blue' : 'none',
                    borderRadius: '8px', // Add border radius for a rounded appearance
                  }}
                />
              </Grid>
              <Grid item>
                <img
                  src={image3}
                  alt="Image 3"
                  width="220"
                  height="220"
                  onClick={() => handleImageClick('image3.png')}
                  style={{
                    cursor: 'pointer',
                    border: selectedImage === 'image3.png' ? '4px solid blue' : 'none',
                    borderRadius: '8px', // Add border radius for a rounded appearance
                  }}
                />
              </Grid>
              <Grid item>
                <img
                  src={image4}
                  alt="Image 4"
                  width="220"
                  height="220"
                  onClick={() => handleImageClick('image4.png')}
                  style={{
                    cursor: 'pointer',
                    border: selectedImage === 'image4.png' ? '4px solid blue' : 'none',
                    borderRadius: '8px', // Add border radius for a rounded appearance
                  }}
                />
              </Grid>
              <Grid item>
                <img
                  src={image5}
                  alt="Image 5"
                  width="220"
                  height="220"
                  onClick={() => handleImageClick('image5.png')}
                  style={{
                    cursor: 'pointer',
                    border: selectedImage === 'image5.png' ? '4px solid blue' : 'none',
                    borderRadius: '8px', // Add border radius for a rounded appearance
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ height: '100%', overflowY: 'auto' }}>
              {questions.map((question, index) => (
                <Box
                  key={index}
                  my={2}
                  p={2}
                  onClick={() => handleQuestionClick(question)}
                  style={{
                    cursor: 'pointer',
                    border: highlightedQuestion === question ? '2px solid blue' : '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#f0f0f0',
                  }}
                >
                  {question.question}
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={6}>
            {loading && (
              <Box my={2} textAlign="center">
                <CircularProgress />
              </Box>
            )}
            {showAnswer && (
              <Box
                my={4}
                p={2}
                borderRadius="4px"
                border="1px solid #ccc"
                backgroundColor="#f0f0f0"
              >
                <Typography variant="h6" gutterBottom>
                  {selectedQuestion.answer}
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default ImageList;
