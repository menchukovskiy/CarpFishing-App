import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createThunkErrorHandler } from '../../utils/handleThunkError.js';
import { handlePending } from '../../utils/handlePending.js';




const fishingSlice = createSlice({
    name: 'fishing',
    initialState: {
        errors: {},
        globalError: null,
        isLoading: false,
        
    },
    reducers: {

        clearErrors: (state) => {
            state.errors = {}
            state.globalError = null
        },

        clearGlobalError: (state) => {
            state.globalError = null
        },


    },

    extraReducers: builder => {
        //builder
            



    }



});

export const {
    clearErrors,
    clearGlobalError
} = fishingSlice.actions;

export default fishingSlice.reducer;