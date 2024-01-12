import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Container } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to Plastic Pollution App!
      </Typography>
      <Typography variant="body1" paragraph>
        Explore and contribute to a cleaner environment by reporting plastic pollution hotspots.
      </Typography>
      <Button component={Link} to="/signup" variant="contained" color="primary">
        Sign Up
      </Button>
      <Button component={Link} to="/login" variant="outlined" color="primary" sx={{ marginLeft: 2 }}>
        Login
      </Button>
    </Container>
  );
};

export default Home;
