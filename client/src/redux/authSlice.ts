import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
    user: null | { id: string; email: string; username: string };
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
  
const initialState: AuthState = {
    user: null,
    status: 'idle',
    error: null,
};

type User = {
  email: string;
  password: string;
}
type NewUser = User &{
  username: string;
}
  
export const signup = createAsyncThunk(
  'auth/signup', 
  async (userData: NewUser) => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/signup', userData);
    return response.data.user;
  } catch (error) {
    console.error('Error in registering user:', error);
    throw error;
  }
});
  
export const login = createAsyncThunk(
  'auth/login', 
  async (userData: User) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', userData);
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error) {
      console.error('Error login in user:', error);
      throw error;
    }
});
  
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(signup.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(signup.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.user = action.payload;
        })
        .addCase(signup.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message as string;
        })
        .addCase(login.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(login.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message as string;
        });
    },
});
  
  export default authSlice.reducer;