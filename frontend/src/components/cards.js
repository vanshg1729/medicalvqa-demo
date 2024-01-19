import React, { useState } from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import { CardHeader, Typography, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import subpath from './subpath';
import config from './config';

const MyCard = ({ id, title, content, cards, setCards }) => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [confirmationInput, setConfirmationInput] = useState('');

    const handleNavigation = () => {
        localStorage.setItem('module', id);
        window.location.href = `${subpath}/${title}`;
    };

    const handleDelete = () => {
        if (confirmationInput.toLowerCase() === title.toLowerCase()) {
            console.log(`Deleting card with ID: ${id}`);
            setDialogOpen(false);

            const url = `${config.backendUrl}/api/category/delete/${id}`;
            const token = localStorage.getItem('token');
            const deleteCard = async () => {
                const res = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                console.log(data);
            }
            deleteCard();

            const updatedCards = cards.filter((card) => card.id !== id);
            setCards(updatedCards);
                    
            
        } else {
            // Handle incorrect confirmation input
            alert('Module name does not match. Deletion aborted.');
        }
    };

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <Card sx={{ maxWidth: '25rem', margin: '3rem auto', height: '30rem', backgroundColor: '#f5f5f5d1' }}>
            <IconButton
                aria-label="delete"
                style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 1 }}
                onClick={handleOpenDialog}
            >
                <DeleteIcon />
            </IconButton>
            <CardHeader
                titleTypographyProps={{ variant: 'h5', style: { fontSize: '2.5rem', fontFamily: '"Bebas Neue", sans-serif' } }}
                title={title}
                subheader="Created 12/10/22"
            />
            <CardContent>
                {content === undefined ? (
                    <Typography paragraph style={{ fontSize: '1.2rem' }}>
                        No content yet
                    </Typography>
                ) : (
                    <Typography paragraph style={{ fontSize: '1.2rem' }}>
                        {content.split('').slice(0, 300).join('')}...
                    </Typography>
                )}
            </CardContent>
            <Button
                style={{ backgroundColor: 'rgb(113 90 90 / 88%)', color: 'white', height: '6vh' }}
                variant="contained"
                onClick={handleNavigation}
            >
                Learn More
            </Button>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>
                        To confirm deletion, please type the module name <strong>{title}</strong> below:
                    </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="confirmationInput"
                        label="Module Name"
                        type="text"
                        fullWidth
                        value={confirmationInput}
                        onChange={(e) => setConfirmationInput(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Confirm Deletion
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default MyCard;
