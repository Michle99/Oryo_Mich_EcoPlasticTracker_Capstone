import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Container, Grid, Paper } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" gutterBottom>
        Plastic Pollution Tracker
      </Typography>
      <Typography variant="h5" paragraph>
        Contribute to a cleaner environment by reporting and tracking plastic pollution hotspots.
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button component={Link} to="/signup" variant="contained" color="primary">
            Sign Up
          </Button>
        </Grid>
        <Grid item>
          <Button component={Link} to="/login" variant="outlined" color="primary">
            Login
          </Button>
        </Grid>
      </Grid>
      <Paper
        elevation={3}
        sx={{
          marginTop: 4,
          padding: 3,
          maxWidth: 600,
        }}
      >
        <Typography variant="h5" gutterBottom>
          How it Works
        </Typography>
        <Typography variant="body1" paragraph>
          1. Sign up for an account to get started.
        </Typography>
        <Typography variant="body1" paragraph>
          2. Report plastic pollution hotspots by providing details and images.
        </Typography>
        <Typography variant="body1" paragraph>
          3. Explore the interactive map to see reported pollution incidents. (coming soon...)
        </Typography>
        <Typography variant="body1">
          Together, let's make a positive impact on our environment!
        </Typography>
      </Paper>
    </Container>
  );
};

export default Home;
