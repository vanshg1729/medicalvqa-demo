import React, { useEffect, useState } from 'react';
import { Card, Typography, Button, Avatar, Container, Box, IconButton, Modal, Backdrop, Fade } from '@mui/material';
import { Facebook, Instagram, LinkedIn, Google } from '@mui/icons-material';
import './profile.css'; // Import your custom styles
import { createTheme, ThemeProvider } from '@mui/material/styles';
import config from './config';
import Breadcrumbs from './breadcrumbs';
import AvatarInitials from 'avatar-initials';
import RandomAvatar from './randomAvatar';
import subpath from './subpath';
import { TextField } from '@mui/material';

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
  const [descModalOpen, setDescModalOpen] = useState(false); // this is the state of the modal that will open when the user clicks on the add description button
  const [infoModalOpen, setInfoModalOpen] = useState(false); // this is the state of the modal that will open when the user clicks on the edit profile button

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

    // we also have to delete the token from the local storage
    localStorage.removeItem('token');
    window.location.href = `${subpath}`;
    
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

  // now we have to create a modal for entering the description of the user
  const handleDescModalOpen = () => {
    setDescModalOpen(true);
  };

  const handleDescModalClose = () => {
    setDescModalOpen(false);
  };

  const handleDescModalSubmit = () => {
    console.log("description submitted")

    const url = `${config.backendUrl}/api/user/edit`;
    const token = localStorage.getItem('token');
    
    const editUser = async () => {
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ about: description })
      });
      const data = await res.json();
      console.log(data);
    }
    editUser();
    
    handleDescModalClose();
  }

  const handleDescModalChange = (e) => {
    setDescription(e.target.value);
  }

  // now we create a modal for changing the info of the user
  const handleInfoModalOpen = () => {
    setInfoModalOpen(true);
  };

  const handleInfoModalClose = () => {
    setInfoModalOpen(false);
  };

  const handleInfoModalSubmit = () => {
    console.log("info submitted", contact, age, description)

    const url = `${config.backendUrl}/api/user/edit`;
    const token = localStorage.getItem('token');

    const editUser = async () => {
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ contact, age, about: description })
      });
      const data = await res.json();
      console.log(data);
    }
    editUser();
    
    handleInfoModalClose();
  }

  const handleInfoModalChange = (e) => {
    // only the contact, age and description can be changed
    if (e.target.name === 'contact') {
      setContact(e.target.value);
    }
    else if (e.target.name === 'age') {
      setAge(e.target.value);
    }
    else if (e.target.name === 'description') {
      setDescription(e.target.value);
    }
  }
    

  function capitalizeFirstLetter(string) {
    if (string === undefined || string === '') return string
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // const [userData, setUserData] = useState({})
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [age, setAge] = useState('')
  const [contact, setContact] = useState('')
  const [description, setDescription] = useState('')
  const [role, setRole] = useState('')

  // now we will write the code to get the info of the user after sending the token

  

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      window.location.href = `${subpath}`
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
          // setUserData(data)
          setFname(data.fname)
          setLname(data.lname)
          setAge(data.age)
          setContact(data.contact)
          setDescription(data.about)
          setRole(data.role)
          
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
      <Container className='bebas-font' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'Bebas Neue, sans-serif' }}>
        <Card sx={{ width: 500, p: 3, py: 4, backgroundColor: '#F0EAD6' }}>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Profile
            </Typography>
            {/* <Avatar src="https://i.imgur.com/bDLhJiP.jpg" alt="Profile Image" sx={{ width: 100, height: 100, mb: 2, mx: 'auto' }} /> */}
            {/* {generateRandomAvatar()} */}
            <RandomAvatar />
          </Box>

          <Box sx={{ textAlign: 'center', mt: 1 }}>
            {/* <Typography variant="body2" className="bg-secondary" sx={{ p: 1, px: 4, borderRadius: 'rounded', color: 'white' }}>
              Pro
            </Typography> */}
            <Typography variant="h5" mt={1} mb={0}>
              {capitalizeFirstLetter(fname) + " " + capitalizeFirstLetter(lname)}
            </Typography>
            <Typography variant="subtitle1">{capitalizeFirstLetter(role)}</Typography>
            <Typography variant="subtitle2">Age: {age}, Contact: {contact}</Typography>

            <Box sx={{ px: 4, mt: 1 }}>
              {/* is user.about does not exist, then we show the user a button which if clicked opens a modal so that the user can enter a description */}
              {description === undefined || description === '' ? <Button variant="outlined" color="error" size="small" sx={{ px: 2, mb: 2 }} onClick={handleDescModalOpen}>Add Description</Button> : <Typography variant="body1" fontSize={'1.5rem'}> {description} </Typography>}
            </Box>

            {/* <ul className="social-list">
              <li><IconButton><Facebook /></IconButton></li>
              <li><IconButton><Instagram /></IconButton></li>
              <li><IconButton><LinkedIn /></IconButton></li>
              <li><IconButton><Google /></IconButton></li>
            </ul> */}

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
              {role === 'admin' ? null : <Button variant="outlined" sx={{ px: 2, mb: 1 }} onClick={adminOpenHandle}>Request to become {role === 'editor' ? 'admin' : 'editor'}</Button>}
              
              {/* we also make a button to edit the user profile info like age, contact and description in 1 modal itself */}
              <Button variant="outlined" sx={{ px: 2, mb: 1 }} onClick={handleInfoModalOpen}>Edit Profile</Button>
              
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
                  {/* a large fontsize in the textarea */}
                  <textarea rows="4" cols="50" fontSize="1.2  rem" onChange={handleAdminRequestDescription} />
                  <Typography variant="body2" color="textSecondary" mb={2}>
                    Please note that the admin will have the power to delete your account
                  </Typography>
                  <Button variant="outlined" color="error" onClick={handleAdminRequest} sx={{ mt: 2 }}>Submit</Button>
                </Box>
              </Card>
            </Fade>
          </Box>
        </Modal>

        {/* Description Modal, but this modal will be a much bigger modal than the other two */}
        <Modal
          open={descModalOpen}
          onClose={handleDescModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Fade in={descModalOpen}>
              <Card sx={{ width: 500, p: 3, textAlign: 'center', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                <Typography variant="h6" gutterBottom>
                  Add Description
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={2}>
                  Please enter a brief description of yourself
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                  <textarea rows="4" cols="50" onChange={handleDescModalChange} />
                  <Button variant="outlined" color="error" onClick={handleDescModalSubmit} sx={{ mt: 2 }}>Submit</Button>
                </Box>
              </Card>
            </Fade>
          </Box>
        </Modal>

        {/* Info Modal for changing the contact, age, description */}
        <Modal
          open={infoModalOpen}
          onClose={handleInfoModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Fade in={infoModalOpen}>
              <Card sx={{ width: 500, p: 3, textAlign: 'center', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                <Typography variant="h6" gutterBottom>
                  Edit Profile
                </Typography>
                <Typography variant="body1" color="textSecondary" mb={2}>
                  Please enter the new information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                  <TextField id="contact" name="contact" label="Contact" variant="outlined" onChange={handleInfoModalChange} sx={{ mb: 2 }} />
                  <TextField id="age" name="age" label="Age" variant="outlined" onChange={handleInfoModalChange} sx={{ mb: 2 }} />
                  <TextField id="description" name="description" label="Description" variant="outlined" onChange={handleInfoModalChange} sx={{ mb: 2 }} />
                  <Button variant="outlined" color="error" onClick={handleInfoModalSubmit} sx={{ mt: 2 }}>Submit</Button>
                </Box>
              </Card>
            </Fade>
          </Box>
        </Modal>
        

        
      </Container>
    </ThemeProvider>
  );
}
