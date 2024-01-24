import React from 'react';
import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material';
import EditForm from '../EditForm'
import { Report } from '../../redux/reportSlice';

interface EditFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: Report;
}

const EditFormModal: React.FC<EditFormModalProps> = ({ isOpen, onClose, report }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Edit Report</DialogTitle>
      <DialogContent>
        <EditForm report={report} onClose={onClose} />
        {/* You can add more components or buttons as needed */}
        <Button onClick={onClose} variant="contained" color="primary" fullWidth>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditFormModal;
