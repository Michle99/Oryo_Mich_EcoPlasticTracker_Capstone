import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";

//* Initialize token from localStorage
const token = localStorage.getItem("userInfo")
  ? localStorage.getItem("userInfo")
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

export const selectUser = (state: RootState) => state.auth.user;

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData: NewUser) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        userData
      );
      console.log("Data from signup:", response);
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error("Error in registering user:", error);
      throw error;
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData: User) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        userData
      );
      // const { user, token } = response.data;
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      console.log("Data from login route:", response);
      return response.data;
    } catch (error) {
      console.error("Error login in user:", error);
      throw error;
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await axios.post("http://localhost:3000/api/auth/logout");
    localStorage.removeItem("userInfo");
    console.log("Data from login route:", response);
    return null;
  } catch (error) {
    console.error("Error loggin out in user:", error);
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
      .addCase(
        login.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.user = action.payload;
          state.token = action.payload.token;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
        state.token = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export default authSlice.reducer;
