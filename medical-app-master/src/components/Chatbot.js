import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { findBestMatch } from 'string-similarity';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSendQuestion = async () => {
    const userQuestion = userInput.toLowerCase();

    const response = await fetch('http://localhost:5000/api/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: userQuestion }),
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
          message: "I'm sorry, I don't have an answer to that question.",
          isUser: false,
        };

        setChatMessages([...chatMessages, newMessage, errorMessage]);
      }
    }

    setUserInput('');
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '16px',
        width: '350px',
        backgroundColor: '#E3F2FD',
      }}
      elevation={3}
    >
      <Typography variant="h6">Chatbot</Typography>

      <div
        ref={chatContainerRef}
        style={{ maxHeight: '300px', overflowY: 'scroll' }}
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
            <Typography
              variant="body1"
              style={{
                padding: '8px',
                borderRadius: '8px',
                backgroundColor: message.isUser ? '#90CAF9' : '#FFFFFF',
              }}
            >
              {message.message}
            </Typography>
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
