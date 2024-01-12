// src/redux/actions/authActions.ts
import { Dispatch } from 'redux';
import axios from 'axios';
import { AuthActionTypes } from './types';

export const signup = (userData: { email: string; username: string; password: string }) => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup', userData);
      dispatch({ type: 'SIGNUP_SUCCESS', payload: response.data });
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };
};

export const login = (userData: { email: string; password: string }) => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', userData);
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
};
