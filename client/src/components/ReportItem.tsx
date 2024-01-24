import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, ButtonGroup } from '@mui/material';
import { Report, deleteReport, fetchReports } from '../redux/reportSlice';
import ViewDetailsModal from './modals/ViewDetailsModal';
import EditFormModal from './modals/EditFormModal';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';

interface ReportItemProps {
  report: Report;
}

const ReportItem: React.FC<ReportItemProps> = ({ report }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();

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

  const handleDelete = () => {
    // Dispatch the deleteReport action with the report's _id
    dispatch(deleteReport({ _id: report._id }))
      .unwrap()
      .then(() => {
        // Fetch reports again to update the list after deletion
        dispatch(fetchReports());
      });
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
          <Button 
            onClick={handleDelete}
            variant="outlined" 
            color="error"
          >
            Delete
          </Button>
        </ButtonGroup>
      </CardContent>
      {/* View Details Modal */}
      <ViewDetailsModal 
        isOpen={viewDetailsModalOpen}
        onClose={closeViewDetailsModal}
        report={report}
      />

      {/* Edit Modal */}
      <EditFormModal 
        isOpen={editModalOpen}
        onClose={closeEditModal}
        report={report}
      />
    </Card>
  );
};

export default ReportItem;
