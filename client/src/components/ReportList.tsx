import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReports, Report } from '../redux/reportSlice';
import { RootState } from '../redux/store';
import { AppDispatch } from "../redux/store";
import ReportItem from './ReportItem';
import { Grid } from '@mui/material';

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
          {/* Use the new ReportItem component */}
          <ReportItem report={report} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ReportList;
