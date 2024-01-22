import React, { FormEvent, useState } from "react";
import { Button, TextField, Typography, Container, CardMedia } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { submitReport } from "../redux/reportSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

const ReportForm: React.FC = () => {
  // const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const [coordinates, setCoordinates] = useState<string>("");

  const onDrop = (acceptedFiles: File[]) => {
    // Convert the dropped files to an array of data URLs
    const filesDataUrls = acceptedFiles.map(file => URL.createObjectURL(file));
    setImages([...images, ...filesDataUrls]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {'image/*': ['.jpg', '.jpeg', '.png'] },
    onDrop,
    multiple: true,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Check if coordinates is a non-empty string
    if (coordinates && coordinates.trim().length > 0) {
      // Extract latitude and longitude from the coordinates input
      const [latitude, longitude] = coordinates.split(",").map(coord => parseFloat(coord.trim()));

      // Check if the split resulted in two valid numbers
      if (!isNaN(latitude) && !isNaN(longitude)) {
        //* AppDispatch from store needs to be inherited
        dispatch(
          submitReport({
            reportData: {
              location: { type: "Point", coordinates: [latitude, longitude] },
              type,
              title,
              description,
              images,
            },
          })
        );
      } else {
        console.error("Invalid coordinates format. Please enter valid coordinates.");
      }
    } else {
      console.error("Coordinates cannot be empty. Please enter valid coordinates.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        <Typography variant="h5">Submit Report</Typography>
        <Typography>Drag & Drop images here or click to select</Typography>
      </div>
      <form onSubmit={handleSubmit} style={formStyles}>
        <TextField
          label="Location (Latitude, Longitude)"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={coordinates}
          onChange={(e) => setCoordinates(e.target.value)}
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
        {images.length > 0 && (
          <CardMedia style={imagesContainerStyles}>
            {images.map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`uploaded-${index}`} style={imageStyles} />
            ))}
          </CardMedia>
        )}
        <br/>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};

const dropzoneStyles: React.CSSProperties = {
  border: "2px dashed #ccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
  marginTop: "20px",
};

const formStyles: React.CSSProperties = {
  marginTop: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const imagesContainerStyles: React.CSSProperties = {
  display: "flex",
  marginTop: "10px",
};

const imageStyles: React.CSSProperties = {
  width: "100px",
  height: "100px",
  objectFit: "cover",
  marginRight: "10px",
};

export default ReportForm;
