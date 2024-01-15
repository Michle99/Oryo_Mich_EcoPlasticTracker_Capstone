import React, { useState, ChangeEvent } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../redux/store';

const Signup: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    if (email && username && password) {
      try {
        console.log("Clicked signup");
        await dispatch(signup({ email, username, password }));
        navigate('/login');
      } catch (error) {
        setError('Error signing up. Please check your information and try again.');
        console.error('Error signing up:', error);
      }
    } else {
      console.log("Sign Up Form didn't receive any data.");
    }
    
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Signup
      </Typography>
      <TextField 
        label="Email" 
        variant="outlined" 
        fullWidth 
        value={email} 
        onChange={handleEmailChange} 
      />
      <TextField 
        label="Username" 
        variant="outlined" 
        fullWidth 
        value={username} 
        onChange={handleUsernameChange} 
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        value={password}
        onChange={handlePasswordChange}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSignup} 
        sx={{ marginTop: 2 }}
      >
        Signup
      </Button>
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        Already have an account? <Link to="/login">Login here</Link>
      </Typography>
    </Container>
  );
};

export default Signup;
