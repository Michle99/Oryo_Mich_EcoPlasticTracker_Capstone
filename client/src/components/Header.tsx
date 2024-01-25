import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Menu, 
  MenuItem 
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout, selectUser } from '../redux/authSlice';
import { AppDispatch, useAppSelector } from '../redux/store';
import MenuIcon from '@mui/icons-material/Menu';
import AlertModal from './modals/AlertModal';

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
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [alertOpen, setAlertOpen] = useState(false); // State for the AlertModal

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFormClick = () => {
    if (user) {
      // User is authenticated, navigate to the Form page
      navigate("/submit");
    } else {
      // User is not authenticated, open the AlertModal
      setAlertOpen(true);
    }
    handleClose();
  };

  const handleReportsClick = () => {
    if (user) {
      // User is authenticated, navigate to the Reports page
      navigate("/list");
    } else {
      // User is not authenticated, open the AlertModal
      setAlertOpen(true);
    }
    handleClose();
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              accentColor: "Menu",
            }}
          >
            <MenuItem component={Link} to="/" onClick={handleClose}>
              Home
            </MenuItem>
            <MenuItem onClick={handleFormClick}>
              Form
            </MenuItem>
            <MenuItem onClick={handleReportsClick}>
              Reports
            </MenuItem>
            {user ? (
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            ) : (
              <MenuItem component={Link} to="/login" onClick={handleClose}>
                Login
              </MenuItem>
            )}
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EcoPlastic App
          </Typography>
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
      <AlertModal isOpen={alertOpen} onClose={handleAlertClose} /> {/* Render the AlertModal */}
    </>
  );
};

export default Header;
