import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type Report = {
  location: {
    type: string;
    coordinates: [number, number];
  };
  type: string;
  title: string;
  description: string;
  images: string | string[];
}

// Define the type of the fulfilled action payload
export type SubmitReportPayload = Report;

interface ReportState {
  reports: Report[],
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ReportState = { 
  reports: [], 
  status: 'idle', 
  error: null ,
};

export const fetchReports = createAsyncThunk(
  'reports/fetchReports', 
  async () => {
    const response = await axios.get(
      'http://localhost:3000/api/reports/all'
    );
    return response.data as SubmitReportPayload[];
});

export const submitReport = createAsyncThunk(
  'reports/submitReport', 
  async ({reportData }: { reportData: Report }) => {
    // const { auth } = getState() as RootState;
    const response = await axios.post(
      'http://localhost:3000/api/reports/submit', 
      reportData, 
    );
    return response.data as SubmitReportPayload;
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
        .addCase(fetchReports.fulfilled, (state, action: PayloadAction<SubmitReportPayload[]>) => {
          state.status = 'succeeded';
          state.reports = action.payload;
        })
        .addCase(fetchReports.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message as string;
        })
        .addCase(submitReport.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(submitReport.fulfilled, (state, action: PayloadAction<SubmitReportPayload>) => {
          state.status = 'succeeded';
          state.reports.push(action.payload);
        })
        .addCase(submitReport.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message as string;
        });
    },
  });
  
  export default reportsSlice.reducer;