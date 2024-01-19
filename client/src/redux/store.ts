import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import reportReducer from './reportSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    report: reportReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
