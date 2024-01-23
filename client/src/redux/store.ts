import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import reportReducer from './reportSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    auth: authReducer,
    report: reportReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
