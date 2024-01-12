// src/redux/actions/authActions.ts
import { Dispatch } from 'redux';
import axios from 'axios';
import { AuthActionTypes, SIGNUP_SUCCESS, LOGIN_SUCCESS } from './types';

interface UserData {
  email: string;
  username?: string;
  password: string;
}

export const signup = (userData: UserData) => async (dispatch: Dispatch<AuthActionTypes>) => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/signup', userData);
    dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error signing up:', error);
  }
};

export const login = (userData: UserData) => async (dispatch: Dispatch<AuthActionTypes>) => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', userData);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error logging in:', error);
  }
};
