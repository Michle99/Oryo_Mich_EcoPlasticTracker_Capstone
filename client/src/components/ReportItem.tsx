import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, ButtonGroup, Modal } from '@mui/material';
// import { Link } from 'react-router-dom';
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

  const openViewDetailsModal = () => setViewDetailsModalOpen(true);
  const closeViewDetailsModal = () => setViewDetailsModalOpen(false);

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

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
            onClick={openViewDetailsModal} 
            variant="outlined" 
            color="primary"
          >
            View Details
          </Button>
          <Button 
            onClick={openEditModal}
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
      {/* View Details Modal */}
      <Modal open={viewDetailsModalOpen} onClose={closeViewDetailsModal}>
        <div>
          <h2>Report Details</h2>
          <Typography variant="h6">{report.title}</Typography>
          <Typography variant="body2">{report.description}</Typography>
          {/* Add more details as needed */}
          <Button onClick={closeViewDetailsModal}>Close</Button>
        </div>
      </Modal>
    </Card>
  );
};

export default ReportItem;
