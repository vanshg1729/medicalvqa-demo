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

const SearchComponent = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedDataset, setSelectedDataset] = useState('');
  const [question, setQuestion] = useState('');

  const handleImageChange = (event, value) => {
    setSelectedImage(value);
  };

  const handleDatasetChange = (event) => {
    setSelectedDataset(event.target.value);
  };

  const handleQuestionChange = (event, value) => {
    setQuestion(value);
  };

  const handleSearch = () => {
    // Handle search functionality here
    console.log('Search:', {
      selectedImage,
      selectedDataset,
      question,
    });
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
                options={['ABCDE', 'FGHIJ', 'KLMNO']}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Dataset"
                    placeholder="Select Dataset"
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <Autocomplete
                value={selectedImage}
                onChange={handleImageChange}
                options={['Image 1', 'Image 2', 'Image 3']}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Image"
                    placeholder="Select Image"
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <Autocomplete
              freeSolo
              value={question}
              onChange={handleQuestionChange}
              options={['Option 1', 'Option 2', 'Option 3']}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Question"
                  placeholder="Enter a Question"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {selectedImage && (
              <Box sx={{ width: '100%', maxWidth: '300px' }}>
                <Typography variant="subtitle1">Selected Image:</Typography>
                <img
                  src={selectedImage}
                  alt="Selected Image"
                  style={{ width: '100%', height: 'auto', marginTop: '8px' }}
                />
              </Box>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SearchComponent;
