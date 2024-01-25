import React from 'react';
import { Dialog, DialogContent, DialogTitle, Typography, Button, DialogContentText, DialogActions } from '@mui/material';
import { Report } from '../../redux/reportSlice';

interface ViewDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: Report;
}

const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({ 
  isOpen, onClose, report 
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{report.title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{report.type}</Typography>
        <Typography variant="body1">{report.location.coordinates[0]}, {report.location.coordinates[1]}</Typography>
        <DialogContentText>{report.description}</DialogContentText>
        <DialogActions>
          <Button onClick={onClose} variant="contained" color="primary" fullWidth>
            Close
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetailsModal;
