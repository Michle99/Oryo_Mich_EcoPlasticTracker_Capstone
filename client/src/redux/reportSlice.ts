import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

export type Report = {
  _id: string;
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

// Additional types for update/edit and delete actions
export type UpdateReportPayload = {
  _id: string;
  updatedReport: Report;
};

export type DeleteReportPayload = {
  _id: string;
};

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
  async (_, { getState }) => {
    const { auth } = getState() as RootState
    const response = await axios.get(
      'http://localhost:3000/api/reports/all',
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        }
      }
    );
    localStorage.getItem('reports');
    return response.data as SubmitReportPayload[];
});

export const submitReport = createAsyncThunk(
  'reports/submitReport', 
  async ({reportData }: { reportData: Report }, { getState }) => {
    const { auth } = getState() as RootState;
    const response = await axios.post(
      'http://localhost:3000/api/reports/submit', reportData, 
      {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': "*",
          Authorization: `Bearer ${auth.token}`,
        }
      }
    );
    localStorage.setItem('reports', JSON.stringify(response.data));
    return response.data as SubmitReportPayload;
});

// Additional async thunk for updating/editing a report
export const updateReport = createAsyncThunk(
  'reports/updateReport',
  async ({ _id, updatedReport }: UpdateReportPayload, { getState }) => {
    const { auth } = getState() as RootState;
    const response = await axios.put(
      `http://localhost:3000/api/reports/update/${_id}`,
      updatedReport, 
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        }
      }
    );
    return response.data as SubmitReportPayload;
  }
);

// Additional async thunk for deleting a report
export const deleteReport = createAsyncThunk(
  'reports/deleteReport',
  async ({ _id }: DeleteReportPayload, { getState }) => {
    const { auth } = getState() as RootState;
    const response = await axios.delete(
      `http://localhost:3000/api/reports/delete/${_id}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        }
      }
    );
    return response.data as SubmitReportPayload;
  }
);


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
        })
        .addCase(updateReport.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(updateReport.fulfilled, (state, action: PayloadAction<SubmitReportPayload>) => {
          state.status = 'succeeded';
          // Update the existing report in the state
          const updatedIndex = state.reports.findIndex((report) => report._id === action.payload._id);
          if (updatedIndex !== -1) {
            state.reports[updatedIndex] = action.payload;
          }
        })
        .addCase(updateReport.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message as string;
        })
        .addCase(deleteReport.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(deleteReport.fulfilled, (state, action: PayloadAction<SubmitReportPayload>) => {
          state.status = 'succeeded';
          // Remove the deleted report from the state
          state.reports = state.reports.filter((report) => report._id !== action.payload._id);
        })
        .addCase(deleteReport.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message as string;
        });
    },
  });
  
  export default reportsSlice.reducer;