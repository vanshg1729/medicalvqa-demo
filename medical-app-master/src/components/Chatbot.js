import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';

import data from './data.json';
import { useTheme } from '@mui/material/styles';

const Chatbot = ({ selectedImage, chatbotShow, setChatbotShow }) => {
  const theme = useTheme();
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const suggestion = useRef(null);
  const empty = useRef([]);
  // const askedQuestion = useRef(false);
  const [askedQuestion, setAskedQuestion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [isRecording, setIsRecording] = useState(false);

  // const recognition = new window.webkitSpeechRecognition();

  var transcript = '';

  const handleSpeechRecognition = () => {
    // toggleRecording();
    const redDot = document.getElementById('redDot');
    // if (!isRecording) {
    //   redDot.style.display = 'block';
    //   recognition.onstart = () => {
    //     setIsRecording(true);
    //   };

    //   recognition.onresult = (event) => {
    //     transcript = event.results[0][0].transcript;
    //   };

    //   recognition.onend = () => {
    //     handleSendQuestion();
    //     setIsRecording(false);
    //   };

    //   recognition.start();
    // } else {
    //   redDot.style.display = 'none';
    //   recognition.stop();
    // }
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
    let userQuestion = userInput.toLowerCase();
    if (e && e.target.innerText != 'SEND') {
      userQuestion = e.target.innerText.toLowerCase();
    }
    if (transcript) {
      setUserInput(transcript);
      userQuestion = transcript.toLowerCase();
    }
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



    const keywordExtractor = require("keyword-extractor");

    const text = "This is an example sentence, and we want to extract important keywords from it.";
    const keywords = keywordExtractor.extract(userQuestion, {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true,
    });
    // converting the keywords array into a string
    var keywordsString = keywords.join(" ");
    console.log(keywordsString, "the keywords");


    const response = await fetch('http://localhost:5000/api/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: keywordsString, selectedImage: imageIdWithExtension }),
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
    for (var i = 0; i < dataLength; i++) {
      if (data.images[i].image === actualImage) {
        for (var j = 0; j < data.images[i].questions.length; j++) {
          suggestions.push(data.images[i].questions[j].question);
        }
        break;
      }
    }
    if (suggestions && suggestions.length > 0) {
      return suggestions[num];
    }
    return '';
  };

  const gridItem = {
    width: '20vw',
    fontSize: "14px",
    textAlign: "center",
    backgroundColor: "#3D4849",
    color: '#F0EAD6',
    // border: "4px solid rgb(26 94 170)",
  }
  const gridItem2 = {
    width: '20vw',

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
          gap: "1vh",
        }}>
          <Box style={{
            // maxWidth: '100%',
            width: '20vw',
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
              height: '70vh',
              overflowY: 'auto',
              marginBottom: '1vh',
              padding: '2vh',
            }}>
              <Typography style={{
                textAlign: 'center',
                color: '#F0EAD6',
                marginTop: '2vh',
                fontFamily: '"Bebas Neue", sans-serif',
                letterSpacing: '2px',
              }} variant="h3">KREST Fetal Radiology Image Bank for Personalized Learning</Typography>


              {/* Placing an image here */}
              <Box style={{
                marginTop: "3vh",
                textAlign: "center",
                borderRadius: "10px",
              }}>
                <img src={selectedImage} style={{
                  maxWidth: "33vw",
                  maxHeight: "33vh",
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
                gap: "1vh",
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
            }} variant="h3">KREST</Typography>
            <Box
              ref={chatContainerRef}
              sx={{
                // maxHeight: '90vh',
                [theme.breakpoints.up('sm')]: {
                  height: '55vh',
                },
                [theme.breakpoints.up('md')]: {
                  height: '55vh',
                },
                [theme.breakpoints.up('lg')]: {
                  height: '55vh',
                },
                [theme.breakpoints.up('xl')]: {
                  height: '59vh',
                },
                overflowY: 'auto',
                marginBottom: '1vh',
                padding: '2vh',
              }}
            >

              {chatMessages.map((message) => (
                <Box
                  key={message.id}
                  style={{
                    display: 'flex',
                    justifyContent: message.isUser ? 'flex-start' : 'flex-start',
                    marginBottom: '1vh',
                  }}
                >
                  <Typography
                    variant="body1"
                    style={{
                      padding: '1vh',
                      borderRadius: '1vh',
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
            style={{ marginTop: '2vh', color: '#F0EAD6', border: '2px solid darkgrey' }}
          />
          {/* <MicIcon variant='contained' style={{
            position: 'relative',
            top: '-5vh',
            left: '46vw',
            // padding: '8px',
            height: '4.5vh',
            width: '2vw',
            backgroundColor: 'transparent',
          }} onClick={handleSpeechRecognition} /> */}
        </Box>
        <Button
          variant="contained"
          onClick={handleSendQuestion}
          disabled={!userInput}
          style={{
            position: 'relative',
            // top: '-0.5vh',
            left: '-0.5vw',
            margin: '10px',
            marginLeft: '2vh',
            color: '#F0EAD6',
            backgroundColor: userInput ? 'rgb(128 149 151)' : 'rgb(30 36 36)',
          }}
        >
          Send
        </Button>
        <div className="box" style={{
          width: '5vh',
          height: '5vh',
          position: 'relative',
          top: '-10vh',
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
