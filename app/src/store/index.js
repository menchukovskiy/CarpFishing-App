import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import settingsReducer from './slice/settingsSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        settings: settingsReducer,
    }
}); 