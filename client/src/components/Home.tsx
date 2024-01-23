import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Container } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to Plastic Pollution App!
      </Typography>
      <Typography variant="body1" paragraph>
        Explore and contribute to a cleaner environment by reporting plastic pollution hotspots.
      </Typography>
      <Container 
        sx={{ 
          display: 'flex', 
          gap: 2, 
          flexDirection: 'row',
          justifyContent: 'center',
        }}
        >
        <Button component={Link} to="/signup" variant="contained" color="primary">
          Sign Up
        </Button>
        <Button component={Link} to="/login" variant="contained" color="primary">
          Login
        </Button>
      </Container>
    </Container>
  );
};

export default Home;
