// EditForm.tsx
import React, { FormEvent, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Report, updateReport } from '../redux/reportSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';

interface EditFormProps {
  report: Report;
  onClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ report, onClose }) => {
  const [type, setType] = useState(report.type);
  const [title, setTitle] = useState(report.title);
  const [description, setDescription] = useState(report.description);

  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Dispatch the updateReport action with the edited report data
    dispatch(
      updateReport({ 
        _id: report._id, 
        updatedReport: 
        { 
          ...report, 
          type, 
          title, 
          description 
        } 
      })
    );

    // Close the modal after submitting the changes
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Type"
        variant="outlined"
        margin="normal"
        fullWidth
        required
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <TextField
        label="Title"
        variant="outlined"
        margin="normal"
        fullWidth
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Description"
        variant="outlined"
        margin="normal"
        fullWidth
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Save Changes
      </Button>
    </form>
  );
};

export default EditForm;
