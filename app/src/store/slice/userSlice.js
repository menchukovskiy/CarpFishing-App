import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createThunkErrorHandler } from '../../utils/handleThunkError.js';
import { handlePending } from '../../utils/handlePending.js';
import { registration, signin } from '../../http/userAPI.js';

export const handleRegistration = createAsyncThunk(
    'user/handleRegistration',
    async ({ login, password, email, timezone }, { rejectWithValue }) => {
        try {
            const data = await registration(login, password, email, timezone)
            return data
        } catch (e) {
            return rejectWithValue(e?.code || 'Registration failed')
        }
    }
);

export const handleLogin = createAsyncThunk(
    'user/handleLogin',
    async ({ login, password }, { rejectWithValue }) => {
        try {
            const data = await signin(login, password)
            return data
        } catch (e) {
            return rejectWithValue(e?.code || 'Login failed')
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuth: false,
        token: null,
        errors: {},
        globalError: null,
        isLoading: false,
        user: {},

    },
    reducers: {
        setUser(state, action) {
            state.isAuth = true
            state.user = action.payload.user
        },


        clearErrors: (state) => {
            state.errors = {}
            state.globalError = null
        },

        clearGlobalError: (state) => {
            state.globalError = null
        },

        removeUser(state) {
            state.isAuth = false
            state.user = {}
            localStorage.removeItem('token')
        },




    },

    extraReducers: builder => {
        builder

        .addCase(handleRegistration.rejected, createThunkErrorHandler("REGISTRATION"))
        .addCase(handleRegistration.pending, handlePending)
        .addCase(handleRegistration.fulfilled, (state, action) => {
            state.isAuth = true
            state.user = action.payload.user
            localStorage.setItem('token', action.payload.token)
        })

        .addCase(handleLogin.rejected, createThunkErrorHandler("LOGIN"))
        .addCase(handleLogin.pending, handlePending)
        .addCase(handleLogin.fulfilled, (state, action) => {
            state.isAuth = true
            state.user = action.payload.user
            localStorage.setItem('token', action.payload.token)
        })

    }



});

export const {
    setUser,
    clearErrors,
    clearGlobalError,
    removeUser
} = userSlice.actions;

export default userSlice.reducer;