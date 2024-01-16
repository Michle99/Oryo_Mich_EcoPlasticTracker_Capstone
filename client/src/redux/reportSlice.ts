import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchReports = createAsyncThunk('reports/fetchReports', async () => {
    const response = await axios.get('http://localhost:3000/api/reports/all');
    return response.data;
});