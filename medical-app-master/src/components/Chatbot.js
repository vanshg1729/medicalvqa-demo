import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { findBestMatch } from 'string-similarity';
import data from './data.json';

const Chatbot = ({ selectedImage }) => {
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const suggestion = useRef(null);
  const empty = useRef([]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSendQuestion = async () => {
    if (suggestion.current) {
      setUserInput(suggestion.current);
      suggestion.current = null;
    }
    const userQuestion = userInput.toLowerCase();
    // need to convert /static/media/image2.1b96c51f8712b2e9ac56.png into image2.png
    var imageName = ''
    var imageId = ''
    var imageIdWithExtension = ''
    if (selectedImage === null) {
      // set the bot respnse to please select an image first
      const errorMessage = {
        id: chatMessages.length + 1,
        message: 'Please select an image first.',
        isUser: false,
      };
    }
    else {
      imageName = selectedImage.split('/').pop();
      imageId = imageName.split('.')[0];
      // now joining it with the imageName.split('.')[2]
      imageIdWithExtension = imageId + '.' + imageName.split('.')[2];
    }
    const response = await fetch('http://localhost:5000/api/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: userQuestion, selectedImage: imageIdWithExtension }),
    });

    if (response.ok) {
      const data = await response.json();
      const answer = data.answer;

      const newMessage = {
        id: chatMessages.length + 1,
        message: userQuestion,
        isUser: true,
      };

      if (answer) {
        const botAnswer = {
          id: chatMessages.length + 2,
          message: answer,
          isUser: false,
        };

        setChatMessages([...chatMessages, newMessage, botAnswer]);
      } else {
        const errorMessage = {
          id: chatMessages.length + 2,
          message: "I'm sorry, I don't have an answer to that question for the selected image.",
          isUser: false,
        };

        setChatMessages([...chatMessages, newMessage, errorMessage]);
      }
    }

    setUserInput('');
  };

  const getSuggestionQuestion = () => {
    var actualImage = ''
    var suggestions = []
    const dataLength = Object.keys(data.images).length;
    if (selectedImage === null) {
      return '';
    }
    actualImage = selectedImage.split('/').pop().split('.')[0] + '.' + selectedImage.split('/').pop().split('.')[2];
    for (var i = 0; i < dataLength; i++) {
      if (data.images[i].image === actualImage) {
        console.log(data.images[i].questions, 'data[i].questions[i]');
        for (var j = 0; j < data.images[i].questions.length; j++) {
          suggestions.push(data.images[i].questions[j].question);
        }
        break;
      }
    }
    if (suggestions && suggestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * suggestions.length);
      return suggestions[randomIndex];
    }
    return '';
  };

  useEffect(() => {
    // clear the chat messages when a new image is selected in the fastest way
    setChatMessages(empty.current);
    const suggestion = getSuggestionQuestion();
    if (suggestion) {
      const suggestionMessage = {
        id: chatMessages.length + 1,
        message: suggestion,
        isUser: true,
        isSuggestion: true,
      };
      setChatMessages([...chatMessages, suggestionMessage]);
    }
  }, [selectedImage]);

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: '10px',
        left: '1200px',
        padding: '16px',
        height: '425px',
        width: '550px',
        backgroundColor: '#E3F2FD',
      }}
      elevation={3}
    >
      <Typography variant="h6">Chatbot</Typography>

      <div
        ref={chatContainerRef}
        style={{
          maxHeight: '280px',
          height: '280px',
          overflowY: 'auto',
          marginBottom: '8px',
        }}
      >
        {chatMessages.map((message) => (
          <div
            key={message.id}
            style={{
              display: 'flex',
              justifyContent: message.isUser ? 'flex-end' : 'flex-start',
              marginBottom: '8px',
            }}
          >
            {message.isSuggestion ?
              <Button
                variant="body1"
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  backgroundColor: message.isUser ? '#90CAF9' : '#FFFFFF',
                  color: message.isSuggestion ? '#3F51B5' : 'inherit'
                }}
                onClick={(suggestion.current = message.message) && handleSendQuestion}
              >
                {message.message}
              </Button> :
              <Typography
                variant="body1"
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  backgroundColor: message.isUser ? '#90CAF9' : '#FFFFFF',
                  color: message.isSuggestion ? '#3F51B5' : 'inherit'
                }}
              >
                {message.message}
              </Typography>}
          </div>
        ))}
      </div>

      <TextField
        fullWidth
        variant="outlined"
        label="Your Question"
        value={userInput}
        onChange={handleInputChange}
        style={{ marginTop: '16px' }}
      />
      <Button
        variant="contained"
        onClick={handleSendQuestion}
        disabled={!userInput}
        style={{ marginTop: '8px' }}
      >
        Send
      </Button>
    </Paper>
  );
};

export default Chatbot;
