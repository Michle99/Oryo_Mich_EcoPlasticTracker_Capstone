import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';
import { Report } from '../redux/reportSlice';

interface ReportItemProps {
  report: Report;
}

const ReportItem: React.FC<ReportItemProps> = ({ report }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleNextImage = () => {
    if (Array.isArray(report.images) && report.images.length > 0) {
        setImageIndex((prevIndex) => (prevIndex + 1) % report.images.length);
    }
  };

  const handlePrevImage = () => {
    if (Array.isArray(report.images) && report.images.length > 0) {
        setImageIndex((prevIndex) => (prevIndex - 1 + report.images.length) % report.images.length);
    }
  };

  return (
    <Card>
      {/* Image Slider Section */}
      {Array.isArray(report.images) && report.images.length > 0 && (
        <CardMedia
          component="img"
          alt="Pollution Report"
          height="140"
          src={report.images[imageIndex]}
          onClick={handleNextImage}
          style={{ cursor: 'pointer' }}
        />
      )}
      {/* Image Slider Controls */}
      {Array.isArray(report.images) && report.images.length > 1 && (
        <ButtonGroup fullWidth>
          <Button onClick={handlePrevImage}>Previous</Button>
          <Button onClick={handleNextImage}>Next</Button>
        </ButtonGroup>
      )}
      <CardContent>
        <Typography variant="h6">{report.title}</Typography>
        <Typography variant="body2">{report.description}</Typography>
        <Typography variant="body2">Type: {report.type}</Typography>
        {report.location && report.location.coordinates && (
          <Typography variant="body2">
            Location: {report.location.coordinates[0]}, {report.location.coordinates[1]}
          </Typography>
        )}
        {/* Buttons for view, edit, and delete actions */}
        <ButtonGroup fullWidth>
          <Button 
            component={Link} 
            to={`/report/${report._id}`} 
            variant="outlined" 
            color="primary"
          >
            View Details
          </Button>
          <Button 
            component={Link}
            to={`/report/${report._id}`}
            variant="outlined" 
            color="secondary"
          >
            Edit
          </Button>
          <Button variant="outlined" color="error">
            Delete
          </Button>
        </ButtonGroup>
      </CardContent>
    </Card>
  );
};

export default ReportItem;
