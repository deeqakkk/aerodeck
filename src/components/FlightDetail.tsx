import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Alert, Card, CardContent, Typography, Button, Divider, Snackbar, CardActions, CardMedia } from '@mui/material';
import { useFlightData } from '../hooks/useFlightData';
import Flight from '../types/FlightTypes';

const FlightDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error } = useFlightData(id);
  const [openSnackbar, setOpenSnackbar] = useState(false); 

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!data) {
    return <Alert severity="info">Flight not found</Alert>;
  }

  const flight = data as Flight;

  const handleBooking = () => {
    setOpenSnackbar(true); 
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card sx={{ width: 400, boxShadow: 3 }}>
        <CardMedia
          component="img"
          height="200"
          image={`https://picsum.photos/400/200?random=${flight.id}`}
          alt="Flight"  
          />
        <CardContent>
          <Typography variant="h5" component="div" align="center">
            Flight {flight?.id}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" align="center">
            {flight.airline}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" color="text.secondary">
            <strong>Origin:</strong> {flight.origin}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Destination:</strong> {flight.destination}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Departure Time:</strong> {new Date(flight.departureTime).toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Status:</strong> {flight.status}
          </Typography>
        </CardContent>

        <CardActions>
          <Button variant="contained" color="primary" onClick={handleBooking} fullWidth>
            Book Ticket
          </Button>
          <br/>
          <Button variant="outlined" onClick={() => navigate('/')} fullWidth>
            Go Back
          </Button>
        </CardActions>
      </Card>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Ticket Booked Successfully!"
      />
    </div>
  );
};

export default FlightDetail;
