import React, { FormEvent, useState } from "react";
import { Button, TextField, Typography, Container } from "@mui/material";
import { submitReport } from "../redux/reportSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from '../redux/store';

const ReportForm: React.FC = () => {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    //* AppDispatch from store needs to be inherited 
    dispatch(submitReport({ location, type, title, description, images }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5">Submit Report</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Location"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
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
        /**
         * TODO: Refactor images input
         */
        <TextField
          label="Images (optional)"
          variant="outlined"
          margin="normal"
          fullWidth
          value={images}
          onChange={(e) => setImages(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default ReportForm;
