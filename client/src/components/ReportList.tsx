import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReports, Report } from '../redux/reportSlice';
import { RootState } from '../redux/store';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { AppDispatch } from "../redux/store";

const ReportList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const reports = useSelector((state: RootState) => state.report.reports);

  useEffect(() => {
    // Fetch pollution reports when the component mounts
    dispatch(fetchReports());
  }, [dispatch]);

  return (
    <Grid container spacing={3}>
      {reports.map((report: Report, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Card>
            {/* Media Section */}
            {Array.isArray(report.images) && report.images.length > 0 && (
              <CardMedia
                component="img"
                alt="Pollution Report"
                height="140"
                image={report.images[0]}
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
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ReportList;
