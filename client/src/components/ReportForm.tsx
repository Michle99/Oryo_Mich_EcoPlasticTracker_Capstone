import React, { FormEvent, useState } from "react";
import { 
  Button, 
  TextField, 
  Typography, 
  Container, 
  CardMedia, 
  Paper, 
  styled 
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { submitReport } from "../redux/reportSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";

const DropzoneContainer = styled(Paper)(({ theme }) => ({
  border: "2px dashed #ccc",
  borderRadius: "4px",
  padding: theme.spacing(2),
  textAlign: "center",
  cursor: "pointer",
  marginTop: theme.spacing(2),
}));

const FormContainer = styled("form")(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const ImagesContainer = styled(CardMedia)({
  display: "flex",
  marginTop: "10px",
});

const Image = styled("img")({
  width: "100px",
  height: "100px",
  objectFit: "cover",
  marginRight: "10px",
});

const ReportForm: React.FC = () => {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const [coordinates, setCoordinates] = useState<string>("");
  const navigate = useNavigate();

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevImages) => [...prevImages, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
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
      const [latitude, longitude] = coordinates.split(",").map((coord) => parseFloat(coord.trim()));

      // Check if the split resulted in two valid numbers
      if (!isNaN(latitude) && !isNaN(longitude)) {
        // Dispatch submitReport action
        dispatch(
          submitReport({
            reportData: {
              location: { type: "Point", coordinates: [latitude, longitude] },
              type,
              title,
              description,
              images,
              _id: ""
            },
          })
        );
        // Clear images after successful submission
        setImages([]);
        // Navigate to the report list page
        navigate("/list");
      } else {
        console.error("Invalid coordinates format. Please enter valid coordinates.");
      }
    } else {
      console.error("Coordinates cannot be empty. Please enter valid coordinates.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <DropzoneContainer {...getRootProps()}>
        <input {...getInputProps()} />
        <Typography variant="h5">Submit Report</Typography>
        <Typography>Drag & Drop images here or click to select</Typography>
      </DropzoneContainer>
      <FormContainer onSubmit={handleSubmit}>
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
          <ImagesContainer>
            {images.map((imageUrl, index) => (
              <Image key={index} src={imageUrl} alt={`uploaded-${index}`} />
            ))}
          </ImagesContainer>
        )}
        <br />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </FormContainer>
    </Container>
  );
};

export default ReportForm;
