import React, { useEffect, useState } from 'react';
import { Card, Typography, Button, Avatar, Container, Box, IconButton, Modal, Backdrop, Fade } from '@mui/material';
import { Facebook, Instagram, LinkedIn, Google } from '@mui/icons-material';
import './profile.css'; // Import your custom styles
import { createTheme, ThemeProvider } from '@mui/material/styles';
import config from './config';
import Breadcrumbs from './breadcrumbs';

// Create a theme with Bebas Neue font
const theme = createTheme({
  typography: {
    fontFamily: 'sans-serif',
  },
});

export default function Profile() {
  const [open, setOpen] = useState(false);
  const [adminRequestDescription, setAdminRequestDescription] = useState(''); // this is the description that the user will enter when requesting to become admin
  const [adminOpen, setAdminOpen] = useState(false); // this is the state of the modal that will open when the user clicks on the request to become admin button

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteAccount = () => {

    const url = `${config.backendUrl}/api/user/deleteAccount`;
    const token = localStorage.getItem('token');
    
    const deleteAccount = async () => {
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      console.log(data);
    }
    deleteAccount(); // not tested yet, as we only have one user that is admin rn and so we cant delete the admin
    
    handleClose();
  };

  const adminOpenHandle = () => {
    setAdminOpen(true);
  };

  const adminCloseHandle = () => {
    setAdminOpen(false);
  };

  const handleAdminRequestDescription = (e) => {
    setAdminRequestDescription(e.target.value);
  }

  const handleAdminRequest = () => {
    const url = `${config.backendUrl}/api/request/role`;
    const token = localStorage.getItem('token');
    const description = adminRequestDescription;
    const roleRequested = 'admin';

    const adminRequest = async () => {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description, roleRequested })
      });
      const data = await res.json();
      console.log(data);
    }

    adminRequest();
    adminCloseHandle();
    setAdminRequestDescription('');
    

  }

  function capitalizeFirstLetter(string) {
    if (string === undefined || string === '') return string
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [userData, setUserData] = useState({})

  // now we will write the code to get the info of the user after sending the token

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      window.location.href = '/login'
    }
    else {
      const getUser = async () => {
        try {
          const res = await fetch(`${config.backendUrl}/api/user`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
          const data = await res.json()
          console.log(data, "user data")
          setUserData(data)
        } catch (error) {
          console.log(error)
        }
      }
      getUser()
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Breadcrumbs />
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'Bebas Neue, sans-serif' }}>
        <Card sx={{ width: 500, p: 3, py: 4, backgroundColor: '#F0EAD6' }}>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Profile
            </Typography>
            <Avatar src="https://i.imgur.com/bDLhJiP.jpg" alt="Profile Image" sx={{ width: 100, height: 100, mb: 2, mx: 'auto' }} />
          </Box>

          <Box sx={{ textAlign: 'center', mt: 1 }}>
            {/* <Typography variant="body2" className="bg-secondary" sx={{ p: 1, px: 4, borderRadius: 'rounded', color: 'white' }}>
              Pro
            </Typography> */}
            <Typography variant="h5" mt={1} mb={0}>
              {capitalizeFirstLetter(userData.fname) + " " + capitalizeFirstLetter(userData.lname)}
            </Typography>
            <Typography variant="subtitle1">{capitalizeFirstLetter(userData.role)}</Typography>
            <Typography variant="subtitle2">Age: {userData.age}, Contact: {userData.contact}</Typography>

            <Box sx={{ px: 4, mt: 1 }}>
              <Typography variant="body1" className="fonts" >
              I'm Dr. Samantha Martinez, a cardiologist deeply committed to diagnosing and treating cardiovascular conditions. With a focus on patient care, I blend compassion with the latest advancements in cardiology. Emphasizing preventive measures, I collaborate closely with my patients to ensure their optimal heart health. My dedication to staying updated in the field makes me a trusted and respected professional.
              </Typography>
            </Box>

            <ul className="social-list">
              <li><IconButton><Facebook /></IconButton></li>
              <li><IconButton><Instagram /></IconButton></li>
              <li><IconButton><LinkedIn /></IconButton></li>
              <li><IconButton><Google /></IconButton></li>
            </ul>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
              {userData.role === 'admin' ? null : <Button variant="outlined" sx={{ px: 2, mb: 1 }} onClick={adminOpenHandle}>Request to become {userData.role === 'editor' ? 'admin' : 'editor'}</Button>}
              <Button variant="contained" color="error" size="small" sx={{ px: 2, mb: 2 }} onClick={handleOpen}>Delete account</Button>
            </Box>
          </Box>
        </Card>

        {/* Delete Account Modal */}
        <Modal
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <Card sx={{ width: 300, p: 3, textAlign: 'center', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                <Typography variant="h6" gutterBottom>
                  Confirm Account Deletion
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={2}>
                  Are you sure you want to delete your account?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button variant="outlined" color="error" onClick={handleDeleteAccount}>Yes, Delete</Button>
                  <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                </Box>
              </Card>
            </Box>
          </Fade>
        </Modal>


        {/* Admin Request Modal */}
        <Modal
          open={adminOpen}
          onClose={adminCloseHandle}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Fade in={adminOpen}>
              <Card sx={{ width: 300, p: 3, textAlign: 'center', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                <Typography variant="h6" gutterBottom>
                  Request to become admin
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={2}>
                  Please enter a brief description of why you want to become an admin
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                  <textarea rows="4" cols="50" onChange={handleAdminRequestDescription} />
                  <Button variant="outlined" color="error" onClick={handleAdminRequest}>Submit</Button>
                </Box>
              </Card>
            </Fade>
          </Box>
        </Modal>

        
      </Container>
    </ThemeProvider>
  );
}
