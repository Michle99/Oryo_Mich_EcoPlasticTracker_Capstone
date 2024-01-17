import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button } from '@mui/material';
import { login } from '../redux/authSlice';
import { AppDispatch } from '../redux/store';

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      if (email && password) {
        const response = await dispatch(login({ email, password }));
        if (response.meta.requestStatus === 'fulfilled') {
          // Assuming login action returns user information in payload
          console.log('Login successful:', response.payload);
          navigate('reports');
        } else {
          console.error('Login failed:', response.meta.requestStatus);
        }
      } else {
        console.error('Email and password are required.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField 
        label="Email" 
        variant="outlined" 
        fullWidth 
        value={email} 
        onChange={handleEmailChange} 
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        value={password}
        onChange={handlePasswordChange}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleLogin} 
        sx={{ marginTop: 2 }}
      >
        Login
      </Button>
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        Don't have an account? 
        <Link to="/signup">
          Signup here
        </Link>
      </Typography>
    </div>
  );
};

export default Login;
