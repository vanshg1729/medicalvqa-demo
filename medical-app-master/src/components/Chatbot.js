import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';

import data from './data.json';

const Chatbot = ({ selectedImage, chatbotShow, setChatbotShow }) => {
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const suggestion = useRef(null);
  const empty = useRef([]);
  // const askedQuestion = useRef(false);
  const [askedQuestion, setAskedQuestion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [isListening, setIsListening] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');

  const recognition = new window.webkitSpeechRecognition();

  var transcript = '';

  // let recording = false;

  // function toggleRecording() {
  //   recording = !recording;

  //   if (recording) {
  //   } else {
  //   }
  // }

  const handleSpeechRecognition = () => {
    // toggleRecording();
    const redDot = document.getElementById('redDot');
    if (!isRecording) {
      redDot.style.display = 'block';
      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        transcript = event.results[0][0].transcript;
        // setUserInput(transcript);
        setRecognizedText(transcript);
      };

      recognition.onend = () => {
        handleSendQuestion();
        setIsRecording(false);
      };

      recognition.start();
    } else {
      redDot.style.display = 'none';
      recognition.stop();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSendQuestion = async (e) => {
    console.log('handleSendQuestion was called');
    setAskedQuestion(true)
    setIsVisible(true);
    // if (suggestion.current) {
    //   console.log('this was a suggestion question: ', suggestion.current);
    //   setUserInput(suggestion.current);
    //   // suggestion.current = null;
    // }
    let userQuestion = userInput.toLowerCase();
    if (e && e.target.innerText != 'SEND') {
      userQuestion = e.target.innerText.toLowerCase();
    }
    if (transcript) {
      setUserInput(transcript);
      userQuestion = transcript.toLowerCase();
    }


    // if (suggestion.current) {
    //   userQuestion = suggestion.current.toLowerCase();
    //   suggestion.current = null;
    // }
    console.log(userQuestion, 'userQuestion');
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
      imageName = selectedImage
      // imageId = imageName.split('.')[0];
      // now joining it with the imageName.split('.')[2]
      imageIdWithExtension = imageName.split('/').pop().split('.')[0] + '.' + imageName.split('/').pop().split('.')[2];
    }
    console.log(selectedImage, 'imageIdWithExtension');
    const response = await fetch('https://nicemedvqa.onrender.com/api/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: userQuestion, selectedImage: imageIdWithExtension }),
    });
    console.log("response recieved");

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

  const getSuggestionQuestion = (num) => {
    var actualImage = ''
    var suggestions = []
    const dataLength = Object.keys(data.images).length;
    if (selectedImage === null) {
      return '';
    }
    actualImage = selectedImage.split('/').pop().split('.')[0] + '.' + selectedImage.split('/').pop().split('.')[2];
    // actualImage = selectedImage;
    for (var i = 0; i < dataLength; i++) {
      if (data.images[i].image === actualImage) {
        // console.log(data.images[i].questions, 'data[i].questions[i]');
        for (var j = 0; j < data.images[i].questions.length; j++) {
          suggestions.push(data.images[i].questions[j].question);
        }
        break;
      }
    }
    if (suggestions && suggestions.length > 0) {
      // const randomIndex = Math.floor(Math.random() * suggestions.length);
      return suggestions[num];
    }
    return '';
  };

  const gridItem = {
    width: '360px',

    fontSize: "14px",
    textAlign: "center",
    backgroundColor: "#3D4849",
    color: '#F0EAD6',
    // border: "4px solid rgb(26 94 170)",
  }
  const gridItem2 = {
    width: '360px',

    fontSize: "14px",
    textAlign: "center",
    backgroundColor: "#2f3738",
    color: '#F0EAD6',
    // border: "4px solid rgb(26 94 170)",
  }

  return (
    <Box style={{
      opacity: chatbotShow ? 1 : 0,
      transition: chatbotShow ? 'opacity 1s ease-in-out' : 'noneT',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#3D4849',
    }}>

      {/* Back component */}
      <Button variant="contained" style={{
        position: 'fixed',
        top: '93vh',
        left: '93vw',
        backgroundColor: '#2f3738',
        color: '#F0EAD6',
        zIndex: 100,
      }} onClick={() => {
        setChatbotShow(false);
        setAskedQuestion(false);
        setIsVisible(false);
        setChatMessages(empty.current);
      }}>Back</Button>

      
      {/* Side component */}
      <Box style={{
        // display: isVisible ? 'flex' : 'none',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 2s ease-in-out',
        position: 'fixed',
        left: '2vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        width: '20%',
        height: '90vh',
      }}>
        <Box style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Typography style={{
            textAlign: 'center',
            color: '#F0EAD6',
            marginBottom: '1vh',
          }} variant="h4">Selected Image</Typography>

          <img src={selectedImage} style={{
            margin: 'auto',
            maxWidth: "95%",
            maxHeight: "95%",
            borderRadius: "10px",
          }} />
        </Box>

        {/* the questions */}
        <Box style={{
          marginTop: "5vh",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "7px",
        }}>
          <Box style={{
            // maxWidth: '100%',
            width: '360px'
          }}>
            <Button
              variant="contained"
                            onClick={(askedQuestion == true) ? handleSendQuestion : null}

              style={gridItem2}
            >{getSuggestionQuestion(0)}</Button>
          </Box>
          <Box style={{
            maxWidth: '100%'
          }}>
            <Button
              variant="contained"
              onClick={(askedQuestion == true) ? handleSendQuestion : null}
              style={gridItem2}
            >{getSuggestionQuestion(1)}</Button>
          </Box>
          <Box style={{
            maxWidth: '100%'
          }}>
            <Button
              variant="contained"
                            onClick={(askedQuestion == true) ? handleSendQuestion : null}

              style={gridItem2}
            >{getSuggestionQuestion(2)}</Button>
          </Box>
          <Box style={{
            maxWidth: '100%'
          }}>
            <Button
              variant="contained"
                            onClick={(askedQuestion == true) ? handleSendQuestion : null}

              style={gridItem2}
            >{getSuggestionQuestion(3)}</Button>
          </Box>
        </Box>


      </Box>


      {/* Main component */}
      <Paper
        sx={{
          // overflowX: 'hidden',
          position: 'fixed',
          bottom: '4vh',
          left: '25%',
          // padding: '16px',
          height: '92vh',
          width: '50vw',
          backgroundColor: '#2f3738',
        }}
        elevation={3}
      >
        {askedQuestion == false ?
          <>
            {/* a Box to contain four suggestion questions in boxes */}
            <Typography style={{
              maxHeight: '100vh',
              height: '72vh',
              overflowY: 'auto',
              marginBottom: '8px',
              padding: '16px',
            }}>
              <Typography style={{
                textAlign: 'center',
                color: '#F0EAD6',
                marginTop: '2vh',
                fontFamily: '"Bebas Neue", sans-serif',
                letterSpacing: '2px',
              }} variant="h3">BayMax, your personal healthcare companion</Typography>


              {/* Placing an image here */}
              <Box style={{
                marginTop: "3vh",
                textAlign: "center",
                borderRadius: "10px",
              }}>
                <img src={selectedImage} style={{
                  maxWidth: "350px",
                  maxHeight: "350px",
                  borderRadius: "10px",
                }} />
              </Box>


              <Typography variant='h4' style={{
                textAlign: 'center',
                marginTop: '2vh',
                color: '#F0EAD6',
                fontFamily: '"Bebas Neue", sans-serif',
              }}>Select or type in a question to ask BayMax</Typography>
              <Box style={{
                marginTop: "5vh",
                textAlign: "center",
                display: "grid",
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: "10px",
              }}>
                <Box>
                  <Button
                    variant="contained"
                    onClick={handleSendQuestion}
                    style={gridItem}
                  >{getSuggestionQuestion(4)}
                  </Button>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    onClick={handleSendQuestion}
                    style={gridItem}
                  >{getSuggestionQuestion(5)}
                  </Button>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    onClick={handleSendQuestion}
                    style={gridItem}
                  >{getSuggestionQuestion(6)}
                  </Button>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    onClick={handleSendQuestion}
                    style={gridItem}
                  >{getSuggestionQuestion(7)}
                  </Button>
                </Box>
              </Box>

            </Typography>
          </>

          :
          <>
            <Typography style={{
              textAlign: 'center',
              color: '#F0EAD6',
              marginBottom: '3vh',
              marginTop: '2vh',
            }} variant="h3">BayMax</Typography>
            <Box
              ref={chatContainerRef}
              style={{
                maxHeight: '90vh',
                height: '63vh',
                overflowY: 'auto',
                marginBottom: '8px',
                padding: '16px',
              }}
            >

              {chatMessages.map((message) => (
                <Box
                  key={message.id}
                  style={{
                    display: 'flex',
                    justifyContent: message.isUser ? 'flex-start' : 'flex-start',
                    marginBottom: '8px',
                  }}
                >
                  {/* {message.isSuggestion ?
                    <Button
                      variant="body1"
                      style={{
                        padding: '8px',
                        borderRadius: '8px',
                        backgroundColor: message.isUser ? 'rgb(105 123 124)' : 'rgb(111 117 130)',
                        color: message.isSuggestion ? '#3F51B5' : 'inherit'
                      }}
                      onClick={(suggestion.current = message.message) && handleSendQuestion}
                    >
                      {message.message}
                    </Button> : */}
                  <Typography
                    variant="body1"
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      backgroundColor: message.isUser ? 'rgb(105 123 124)' : 'rgb(111 117 130)',
                      marginBottom: message.isUser ? '0px' : '16px',
                      color: '#F0EAD6',
                      fontSize: '20px',
                    }}
                  >
                    {message.message}
                  </Typography>
                  {/* } */}
                </Box>
              ))}
            </Box>
          </>
        }





        <Box>

          <TextField
            fullWidth
            variant="outlined"
            label="Your Question"
            InputLabelProps={{
              style: {
                color: '#F0EAD6',
              },
            }}
            inputProps={{
              style: {
                color: '#F0EAD6',
              },
            }}
            value={userInput}
            onChange={handleInputChange}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleSendQuestion();
              }
            }}
            style={{ marginTop: '16px', color: '#F0EAD6' }}
          />
          <Button variant='contained' style={{
            position: 'relative',
            top: '-5vh',
            left: '46vw',
            // padding: '8px',
            height: '40px',
            width: '40px',
            backgroundColor: '#3D4849',
          }} onClick={handleSpeechRecognition}>
            <MicIcon />
          </Button>
        </Box>
        <Button
          variant="contained"
          onClick={handleSendQuestion}
          disabled={!userInput}
          style={{
            position: 'relative',
            top: '-3vh',
            left: '-0.5vw',
            margin: '10px',
            marginLeft: '16px',
            color: '#F0EAD6',
            backgroundColor: userInput ? 'rgb(128 149 151)' : 'rgb(30 36 36)',
          }}
        >
          Send
        </Button>
        <div claasName="box" style={{
          width: '50px',
          height: '50px',
          position: 'relative',
          top: '-9vh',
          left: '46.5vw',
          borderRadius: '5px',
        }}>
          <div id="redDot"></div>
        </div>

      </Paper>
    </Box>
  );
};

export default Chatbot;
