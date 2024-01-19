import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

//* Initialize token from localStorage
const token = localStorage.getItem('userInfo')
  ? localStorage.getItem('userInfo')
  : null;

interface AuthState {
  user: null | { id: string; email: string; username: string };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
  token,
};

type User = {
  email: string;
  password: string;
};
type NewUser = User & {
  username: string;
};

type LoginResponse = {
  user: AuthState['user'];
  token: string;
}
export const signup = createAsyncThunk(
  "auth/signup",
  async (userData: NewUser) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        userData
      );
      return response.data.user;
    } catch (error) {
      console.error("Error in registering user:", error);
      throw error;
    }
  }
);

export const login = createAsyncThunk(
  "auth/login", 
  async (userData: User): Promise<LoginResponse> => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      userData
    );
    const { user, token } = response.data;
    localStorage.setItem("userInfo", JSON.stringify(user));
    console.log("Data from login route:", response);
    return { user, token };
  } catch (error) {
    console.error("Error login in user:", error);
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export default authSlice.reducer;
