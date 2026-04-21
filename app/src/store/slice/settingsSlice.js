import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createThunkErrorHandler } from '../../utils/handleThunkError.js';
import { handlePending } from '../../utils/handlePending.js';
import { handleUpdateAvatar, handleRemoveAvatar, handleChangeEmailAndPassword } from './userSlice.js';
import { getUserInfo, updateUserInfo } from '../../http/settingsAPI.js';


export const handleFetchUserInfo = createAsyncThunk(
    'settings/handleFetchUserInfo',
    async (_, { rejectWithValue }) => {
        try {
            const data = await getUserInfo();
            return data;
        } catch (e) {
            return rejectWithValue(e?.code || 'Failed to fetch user information');
        }
    }
);

export const handleUpdateUserInfo = createAsyncThunk(
    'settings/handleUpdateUserInfo',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await updateUserInfo(payload);
            return data;
        } catch (e) {
            return rejectWithValue(e?.code || 'Failed to update user information');
        }
    }
);

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        errors: {},
        globalError: null,
        isLoading: false,
        user_info: {}
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
        builder
            .addCase(handleUpdateAvatar.pending, handlePending)
            .addCase(handleRemoveAvatar.pending, handlePending)
            .addCase(handleChangeEmailAndPassword.pending, handlePending)
            .addCase(handleUpdateAvatar.rejected, createThunkErrorHandler("UPDATE_AVATAR"))
            .addCase(handleRemoveAvatar.rejected, createThunkErrorHandler("REMOVE_AVATAR"))
            .addCase(handleChangeEmailAndPassword.rejected, createThunkErrorHandler("CHANGE_EMAIL_AND_PASSWORD"))
            .addCase(handleChangeEmailAndPassword.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(handleUpdateAvatar.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(handleRemoveAvatar.fulfilled, (state) => {
                state.isLoading = false
            })

            .addCase(handleFetchUserInfo.pending, handlePending)
            .addCase(handleFetchUserInfo.rejected, createThunkErrorHandler("FETCH_USER_INFO"))
            .addCase(handleFetchUserInfo.fulfilled, (state, action) => {
                state.user_info = action.payload.data || {}
                state.isLoading = false
            })
            .addCase(handleUpdateUserInfo.pending, handlePending)
            .addCase(handleUpdateUserInfo.rejected, createThunkErrorHandler("UPDATE_USER_INFO"))
            .addCase(handleUpdateUserInfo.fulfilled, (state, action) => {
                state.user_info = action.payload.data || {}
                state.isLoading = false
            })

            


    }



});

export const {
    clearErrors,
    clearGlobalError
} = settingsSlice.actions;

export default settingsSlice.reducer;