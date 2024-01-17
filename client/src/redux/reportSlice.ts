import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ReportState {
  reports: [],
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ReportState = { 
  reports: [], 
  status: 'idle', 
  error: null ,
};


export const fetchReports = createAsyncThunk('reports/fetchReports', async () => {
    const response = await axios.get('http://localhost:3000/api/reports/all');
    return response.data;
});

export const submitReport = createAsyncThunk('reports/submitReport', async (reportData: any) => {
    const response = await axios.post('http://localhost:3000/api/reports/submit', reportData);
    return response.data;
});


const reportsSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchReports.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchReports.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.reports = action.payload;
        })
        .addCase(fetchReports.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message as string;
        })
        .addCase(submitReport.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.reports.push(action.payload);
        });
    },
  });
  
  export default reportsSlice.reducer;