// components/LoginAlertModal.tsx
import React from 'react';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button 
} from '@mui/material';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginAlertModal: React.FC<AlertModalProps> = ({ 
    isOpen, 
    onClose 
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Alert</DialogTitle>
      <DialogContent>
        <p>
            Please login or register to access the ReportForm and ReportList.
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginAlertModal;
