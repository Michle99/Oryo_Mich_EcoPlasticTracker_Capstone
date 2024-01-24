import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout, selectUser } from '../redux/authSlice';
import { AppDispatch, useAppSelector } from '../redux/store';

const Header: React.FC = () => {

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  
  const handleLogout = async () => {
    try {
        await dispatch(logout());
        navigate("/login");
      } catch (e) {
        console.error(e);
    }
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ marginRight: 2 }}>
        <Button color="inherit" component={Link} to="/">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EcoPlastic App
          </Typography>
        </Button>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/submit">
          Form
        </Button>
        <Button color="inherit" component={Link} to="/list">
          Reports
        </Button>
        {user ? (
          // User is authenticated, show logout button
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          // User is not authenticated, show login button
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
