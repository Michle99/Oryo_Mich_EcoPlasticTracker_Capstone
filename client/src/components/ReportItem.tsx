import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Report } from '../redux/reportSlice';

interface ReportItemProps {
  report: Report;
}

const ReportItem: React.FC<ReportItemProps> = ({ report }) => {
  return (
    <Card>
      {/* Media Section */}
      {Array.isArray(report.images) && report.images.length > 0 && (
        <CardMedia
          component="img"
          alt="Pollution Report"
          height="140"
          image={report.images[0]} //* create an image slider
        />
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
        {/* Add Link to view more details */}
        <Button component={Link} to={`/report/${report.title}`} variant="outlined" color="primary">
          View Details
        </Button>
        {/* Add buttons for edit and delete actions */}
        <Button variant="outlined" color="secondary" style={{ marginLeft: '10px' }}>
          Edit
        </Button>
        <Button variant="outlined" color="error" style={{ marginLeft: '10px' }}>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReportItem;
