import React from 'react';
import { Dialog, DialogContent, DialogTitle, Typography, Button } from '@mui/material';
import { Report } from '../../redux/reportSlice';

interface ViewDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: Report;
}

const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({ isOpen, onClose, report }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        <Typography variant="h6">{report.title}</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">{report.description}</Typography>
        <Typography variant="body1">{report.type}</Typography>
        <Typography variant="body1">{report.location.coordinates}</Typography>
        <Button onClick={onClose} variant="contained" color="primary" fullWidth>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetailsModal;
