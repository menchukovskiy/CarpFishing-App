import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import settingsReducer from './slice/settingsSlice';
import fishingReducer from './slice/fishingSlice.js';

export const store = configureStore({
    reducer: {
        user: userReducer,
        settings: settingsReducer,
        fishing: fishingReducer
    }
}); 