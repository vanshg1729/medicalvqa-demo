import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Breadcrumbs from './breadcrumbs';
import config from './config';

const RequestList = () => {
  const [requestsData, setRequestsData] = useState([]);

  const handleAcceptReject = (id, action) => {

    const url = `${config.backendUrl}/api/request/${action}/${id}`;
    const token = localStorage.getItem('token');

    const acceptRejectRequest = async () => {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
    };

    acceptRejectRequest();

    const updatedRequests = requestsData.filter((request) => request._id !== id);
    setRequestsData(updatedRequests);
  };

  useEffect(() => {
    const url = `${config.backendUrl}/api/request/pending`;
    const token = localStorage.getItem('token');

    const getRequests = async () => {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log('the data is ', data)
      setRequestsData(data['pendingRequests']);
    };
    getRequests();
  }, []);

  return (
    <>
      <Breadcrumbs />
      <div>
        <Typography variant="h2" align="center" fontWeight="bold" marginBottom={10} paddingTop={15} color="#fff5e1" gutterBottom>
          Pending User Requests
        </Typography>
        <Grid container spacing={5} paddingLeft={10} paddingRight={10}>
          {requestsData.length === 0 && (
            <Typography variant="h3" align="center" fontWeight="bold" marginBottom={10} paddingTop={15} color="#fff5e1" gutterBottom>
              (No Pending Requests)
            </Typography>
          )}
          
          {requestsData.map((request) => (
            <Grid item key={request.id} xs={12} sm={6} md={4} lg={4}>
              <Card sx={{ maxWidth: 500, minHeight: 200, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                  <Typography variant="h6" fontSize="1.8rem">
                    User: {request.user.fname} {request.user.lname}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" fontSize="1.2rem">
                    Email: {request.user.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontSize="1.3rem">
                    Role Requested: {request.roleRequested}
                  </Typography>
                  <Typography variant="body2" color="text.primary" fontSize="1.5rem" marginTop={2}>
                    Message: {request.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ marginTop: '1.5rem' }}>
                  <Button
                    size="large"
                    color="success"
                    onClick={() => handleAcceptReject(request._id, 'accept')}
                  >
                    Accept
                  </Button>
                  <Button
                    size="large"
                    color="error"
                    onClick={() => handleAcceptReject(request._id, 'reject')}
                  >
                    Reject
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default RequestList;
