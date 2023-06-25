import React, { useState, useEffect } from 'react';
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

import datasetOptions from './datasetOptions.json';

import image1 from './image1.png';
import image2 from './image2.png';
import image3 from './image3.png';
import image4 from './image4.png';
import image5 from './image5.png';

const SearchComponent = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedDataset, setSelectedDataset] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (event, value) => {
    setSelectedImage(value);
  };

  const handleDatasetChange = (event, value) => {
    setSelectedDataset(value);
    setSelectedImage('');
  };

  const handleQuestionChange = (event, value) => {
    setQuestion(value);
  };

  const handleSearch = () => {
    setIsLoading(true);
    setAnswer('');
    // Simulating a delay of 3-4 seconds before displaying the answer
    setTimeout(() => {
      const dataset = datasetOptions.find((dataset) => dataset.name === selectedDataset);
      if (dataset && selectedImage && question) {
        const image = dataset.images.find((image) => image.url === selectedImage);
        if (image) {
          const selectedQuestion = image.questions.find((q) => q.questionText === question);
          if (selectedQuestion) {
            setAnswer(selectedQuestion.answerText);
            setIsLoading(false);
            return;
          }
        }
      }
      setAnswer('Answer not found.');
      setIsLoading(false);
    }, 3000);
  };

  const getImageOptions = () => {
    const dataset = datasetOptions.find((dataset) => dataset.name === selectedDataset);
    if (dataset) {
      return dataset.images.map((image) => image.url);
    }
    return [];
  };

  const getQuestionOptions = () => {
    const dataset = datasetOptions.find((dataset) => dataset.name === selectedDataset);
    if (dataset && selectedImage) {
      const image = dataset.images.find((image) => image.url === selectedImage);
      if (image) {
        return image.questions.map((q) => q.questionText);
      }
    }
    return [];
  };

  const getImageSrc = (imageName) => {
    switch (imageName) {
      case 'image1.png':
        return image1;
      case 'image2.png':
        return image2;
      case 'image3.png':
        return image3;
      case 'image4.png':
        return image4;
      case 'image5.png':
        return image5;
      default:
        return '';
    }
  };

  return (
    <Box sx={{ marginTop: '24px' }}>
      <Container maxWidth="xl">
        <Typography variant="h2" align="center" sx={{ marginBottom: '24px', marginTop: '40px', fontWeight: 'bold', fontSize: '36px' }}>
          Medical VQA
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: 'rgba(173, 216, 230, 0.3)',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '20px',
              }}
            >
              <Typography variant="h5" sx={{ marginBottom: '10px' }}>
                VQA Model
              </Typography>
              <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                <Autocomplete
                  value={selectedDataset}
                  onChange={handleDatasetChange}
                  options={datasetOptions.map((dataset) => dataset.name)}
                  renderInput={(params) => (
                    <TextField {...params} label="Dataset" placeholder="Select Dataset" />
                  )}
                />
              </FormControl>

              <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                <Autocomplete
                  value={selectedImage}
                  onChange={handleImageChange}
                  options={getImageOptions()}
                  renderInput={(params) => (
                    <TextField {...params} label="Image" placeholder="Select Image" />
                  )}
                />
              </FormControl>

              <FormControl fullWidth>
                <Autocomplete
                  value={question}
                  onChange={handleQuestionChange}
                  options={getQuestionOptions()}
                  renderInput={(params) => (
                    <TextField {...params} label="Question" placeholder="Enter Question" />
                  )}
                />
              </FormControl>

              <Button variant="contained" onClick={handleSearch} disabled={isLoading} sx={{ marginTop: '20px' }}>
                {isLoading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircularProgress size={20} sx={{ marginRight: '10px' }} />
                    Searching...
                  </Box>
                ) : (
                  'Search'
                )}
              </Button>
            </Box>
          </Grid>

          {answer && (
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  backgroundColor: 'rgba(173, 216, 230, 0.3)',
                  padding: '20px',
                  borderRadius: '10px',
                  marginBottom: '20px',
                }}
              >
                <Typography variant="h5" sx={{ marginBottom: '10px' }}>
                  Output
                </Typography>
                {isLoading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircularProgress size={20} sx={{ marginRight: '10px' }} />
                    <Typography>Loading...</Typography>
                  </Box>
                ) : (
                  <Typography>{answer}</Typography>
                )}
              </Box>
            </Grid>
          )}

          {selectedImage && (
            <Grid item xs={12}>
              <Typography variant="h6">Selected Image:</Typography>
              <img
                src={getImageSrc(selectedImage)}
                alt="Selected"
                style={{ width: '100%', height: 'auto', maxWidth: '500px' }}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default SearchComponent;
