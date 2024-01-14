// src/components/Signup.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { signup } from '../redux/authSlice';

const Signup: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<AuthActionTypes, void, RootState>>();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(signup({ email, username, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Sign Up
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={handleEmailChange}
        required
      />
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        value={username}
        onChange={handleUsernameChange}
        required
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
        Sign Up
      </Button>
    </form>
  );
};

export default Signup;
