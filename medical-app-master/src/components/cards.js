import React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import { CardHeader, Typography } from '@mui/material'
import Button from '@mui/material/Button';

const MyCard = ({ title, content }) => {
    const handleNavigation = () => {
        window.location.href = '/profile/module';
    };
    return (
        <Card sx={{ maxWidth: '25rem', margin: '3rem auto', height: '30rem', backgroundColor: '#f5f5f5d1' }}>
            <CardHeader
                titleTypographyProps={{ variant: 'h5', style: { fontSize: '2.5rem', fontFamily: '"Bebas Neue", sans-serif' }}}
                title={title}
                subheader="Created 12/10/22"
            />
            <CardContent>
                <Typography paragraph style={{ fontSize: '1.2rem' }}>{content}</Typography>
            </CardContent>

            <Button style={{ backgroundColor: 'rgb(113 90 90 / 88%)', color: 'white', height: '6vh' }} variant="contained" onClick={handleNavigation}>
                Learn More
            </Button>
        </Card>
    )
};

export default MyCard;
