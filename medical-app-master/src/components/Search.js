import React, { useState } from 'react';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import SearchIcon from '@material-ui/icons/Search';

import { Search as SearchIcon } from '@mui/icons-material';
import { Autocomplete, Grid, Typography, Button, TextField, styled, Box } from "@mui/material";



// const SearchContainer = styled.div
//     display: 'flex',
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
// ;

const SearchContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 'false'
    // borderRadius: '50px',
    // backgroundColor: '#fff',
    // padding: '5px 15px',
    // width: '100%',
    // boxShadow: '0px 0px 5px #888888',
  });


const SearchBox = styled('div')({
    display: 'flex',
    alignItems: 'center',
    borderRadius: '50px',
    backgroundColor: '#fff',
    padding: '5px 15px',
    width: '100%',
    boxShadow: '0px 0px 5px #888888',
  });
  
  const SearchInput = styled(TextField)({
    border: 'none',
    marginLeft: '10px',
    width: '100%',
    '& .MuiInputBase-input': {
      fontSize: '16px',
    },
    '& .MuiInputBase-input:focus': {
      outline: 'none',
    },
  });
  
  const SearchButton = styled(Button)({
    borderRadius: '50px',
    backgroundColor: '#1976d2',
    color: '#fff',
    padding: '5px 15px',
    marginLeft: '10px',
  });
  
  const SearchResult = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
  });
  
  const ResultImage = styled('img')({
    maxWidth: '100%',
    height: 'auto',
  });
  
  const ResultText = styled(Typography)({
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
  });


  const options = [
    { title: 'Option 1' },
    { title: 'Option 2' },
    { title: 'Option 3' },
    { title: 'Option 4' },
    { title: 'Option 5' },
  ];

const Search = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/search?q=${query}}`);
      const data = await response.json();

      // Decode the base64-encoded image
      const decodedImage = atob(data.image);

      // Create a byte array from the decoded image data
      const byteArray = new Uint8Array(decodedImage.length);
      for (let i = 0; i < decodedImage.length; i++) {
        byteArray[i] = decodedImage.charCodeAt(i);
      }

      // Create a blob URL for the image
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(blob);

      // Set the result in the state
      setResult({
        image: imageUrl,
        text: data.caption,
      });
    } catch (error) {
      console.error(error);
      setResult(null);
    }
  };


  return (


    // <Box display="flex">
    //   <Box display="flex">
    //   </Box>
    //   <Box display="flex">
    //   </Box>
    // </Box>


    <SearchContainer maxWidth="md">
      <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <SearchBox>
          <Autocomplete
            id="text-field-autocomplete"
            fullWidth
            options={options}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
                <TextField
                {...params}
                label="Autocomplete"
                variant="outlined"
                // fullWidth
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
            )}
            />
            <SearchButton onClick={handleSearch}>Search</SearchButton>
          </SearchBox>
      </Grid>
      </Grid>
      </SearchContainer>

  );

};
    export default Search;


// import React from 'react';

// const Search = () => {
//   return (
//     <div className="App">
//         "Search Page"
//     </div>
//   );
// };

// export default Search;


// import React, { useState } from 'react';

// function Search() {
//     const [query, setQuery] = useState('');
//     const [image, setImage] = useState('');
//     const [text, setText] = useState('');
//     const [data, setData] = useState([]);
//     const [imageData, setImageData] = useState(null);
//     const [result, setResult] = useState(null);

//     const handleSearch = async () => {
//         const response = await fetch(`http://127.0.0.1:5000/search?q=${query}`);
//         const data = await response.json();
//         console.log(data.image)
        
//         // Decode the base64-encoded image
//         const decodedImage = atob(data.image);
    
//         // Create a blob URL for the image
//         const blob = new Blob([decodedImage], { type: 'image/png' });
//         const imageUrl = URL.createObjectURL(blob);
    
//         console.log(imageUrl)
//         // Set the result in the state
//         setResult({
//           image: imageUrl,
//           text: data.caption,
//         });
//       };

//     // const handleSearch = async () => {
//     //     const response = await fetch(`http://127.0.0.1:5000/search?q=${query}`);
//     //     const contentType = response.headers.get('Content-Type');
//     //     if (contentType && contentType.indexOf('application/json') !== -1) {
//     //         data =  await response.json(); // Parse response as JSON if it's JSON data
//     //       } else {
//     //         data =  await response.blob(); // Parse response as a blob if it's image data
//     //     }
//     //     if (typeof data !== 'string') {
//     //         setImageData(URL.createObjectURL(data)); // Set image data if it's an image
//     //     } else {
//     //         setData(JSON.parse(data)); // Set text data if it's JSON
//     //     }
//     //     // setImage(data.image_url);
//     //     // setText(data.text_response);
//     // }

//     return (
//         <div>
//           <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
//           <button onClick={handleSearch}>Search</button>
//           {result && (
//             <div>
//               <img src={result.image} alt="Search Result" />
//               <p>{result.text}</p>
//             </div>
//           )}
//         </div>
//       );
//     }
    
//     export default Search;
