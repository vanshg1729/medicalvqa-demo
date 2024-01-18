import React, { useState } from 'react';
import { Card, Typography, Button, Avatar, Container, Box, IconButton, Modal, Backdrop, Fade } from '@mui/material';
import { Facebook, Instagram, LinkedIn, Google } from '@mui/icons-material';
import './profile.css'; // Import your custom styles
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a theme with Bebas Neue font
const theme = createTheme({
  typography: {
    fontFamily: 'sans-serif',
  },
});

export default function Profile() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteAccount = () => {
    // Add logic to handle account deletion here
    // For now, let's just close the modal
    handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'Bebas Neue, sans-serif' }}>
        <Card sx={{ width: 400, p: 3, py: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Profile
            </Typography>
            <Avatar src="https://i.imgur.com/bDLhJiP.jpg" alt="Profile Image" sx={{ width: 100, height: 100, mb: 2, mx: 'auto' }} />
          </Box>

          <Box sx={{ textAlign: 'center', mt: 1 }}>
            <Typography variant="body2" className="bg-secondary" sx={{ p: 1, px: 4, borderRadius: 'rounded', color: 'white' }}>
              Pro
            </Typography>
            <Typography variant="h5" mt={1} mb={0}>
              Alexender Schidmt
            </Typography>
            <Typography variant="subtitle1">UI/UX Designer</Typography>

            <Box sx={{ px: 4, mt: 1 }}>
              <Typography variant="body1" className="fonts">
                Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>
            </Box>

            <ul className="social-list">
              <li><IconButton><Facebook /></IconButton></li>
              <li><IconButton><Instagram /></IconButton></li>
              <li><IconButton><LinkedIn /></IconButton></li>
              <li><IconButton><Google /></IconButton></li>
            </ul>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
              <Button variant="outlined" sx={{ px: 2, mb: 1 }}>Request to become admin</Button>
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
      </Container>
    </ThemeProvider>
  );
}
