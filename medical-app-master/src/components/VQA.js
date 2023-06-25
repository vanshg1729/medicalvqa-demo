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
} from '@mui/material';

import datasetOptions from './datasetOptions.json';

import image1 from './image1.png';
import image2 from './image2.png';
import image3 from './image3.png';
import image4 from './image4.png';

const SearchComponent = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedDataset, setSelectedDataset] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

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
    const dataset = datasetOptions.find((dataset) => dataset.name === selectedDataset);
    if (dataset && selectedImage && question) {
      const image = dataset.images.find((image) => image.url === selectedImage);
      if (image) {
        const selectedQuestion = image.questions.find((q) => q.questionText === question);
        if (selectedQuestion) {
          setAnswer(selectedQuestion.answerText);
          return;
        }
      }
    }
    setAnswer('Answer not found.');
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
      default:
        return '';
    }
  };

  return (
    <Box sx={{ marginTop: '24px' }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth sx={{ minWidth: 100 }}>
              <Autocomplete
                value={selectedDataset}
                onChange={handleDatasetChange}
                options={datasetOptions.map((dataset) => dataset.name)}
                renderInput={(params) => (
                  <TextField {...params} label="Dataset" placeholder="Select Dataset" />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <Autocomplete
                value={selectedImage}
                onChange={handleImageChange}
                options={getImageOptions()}
                renderInput={(params) => (
                  <TextField {...params} label="Image" placeholder="Select Image" />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
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
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </Grid>

          {selectedImage && (
            <Grid item xs={12}>
              <Typography variant="h6">Selected Image:</Typography>
              <img src={getImageSrc(selectedImage)} alt="Selected" style={{ width: '100%', height: 'auto', maxWidth: '500px' }} />
            </Grid>
          )}

          {answer && (
            <Grid item xs={12}>
              <Typography variant="h6">Answer:</Typography>
              <Typography>{answer}</Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default SearchComponent;
