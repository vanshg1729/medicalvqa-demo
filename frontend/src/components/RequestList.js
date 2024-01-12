import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const initialRequestsData = [
  {
    id: 1,
    username: 'John Doe',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin auctor metus vitae feugiat commodo.',
  },
  {
    id: 2,
    username: 'Jane Smith',
    description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
  },
  {
    id: 3,
    username: 'Person 3',
    description: 'Lyrics to a song',
  },
  {
    id: 4,
    username: 'Person 4',
    description: 'How to make a cake',
  },
];

const RequestList = () => {
  const [requestsData, setRequestsData] = useState(initialRequestsData);

  const handleAcceptReject = (id, action) => {
    const updatedRequests = requestsData.filter((request) => request.id !== id);
    setRequestsData(updatedRequests);
  };

  return (
    <div>
      <Typography variant="h2" align="center" fontWeight="bold" marginBottom={10} marginTop={4} color="#fff5e1" gutterBottom>
        Requests
      </Typography>
      <Grid container spacing={5} paddingLeft={10} paddingRight={10}>
        {requestsData.map((request) => (
          <Grid item key={request.id} xs={12} sm={6} md={4} lg={4}>
            <Card sx={{ maxWidth: 500, minHeight: 200, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography variant="h6" fontSize="1.8rem">
                  {request.username}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize="1.3rem">
                  {request.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ marginTop: 'auto' }}>
                <Button
                  size="large"
                  color="success"
                  onClick={() => handleAcceptReject(request.id, 'accept')}
                >
                  Accept
                </Button>
                <Button
                  size="large"
                  color="error"
                  onClick={() => handleAcceptReject(request.id, 'reject')}
                >
                  Reject
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RequestList;
