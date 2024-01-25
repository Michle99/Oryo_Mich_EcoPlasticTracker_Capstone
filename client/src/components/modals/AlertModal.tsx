import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ 
  isOpen, 
  onClose 
}) => {

  const handleClose = () => {
    onClose(); 
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Access Denied</DialogTitle>
      <DialogContent>
        <p>
          Please login or register to access the ReportForm and ReportList.
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button 
          component={Link} 
          to="/login" 
          color="primary" 
          onClick={handleClose}
        >
          Login
        </Button>
        <Button 
          component={Link} 
          to="/signup" 
          color="primary" 
          onClick={handleClose}
        >
          SignUp
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertModal;