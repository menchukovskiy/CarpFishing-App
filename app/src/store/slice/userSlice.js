import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createThunkErrorHandler } from '../../utils/handleThunkError.js';
import { handlePending } from '../../utils/handlePending.js';
import { registration, signin, updateAvatar, removeAvatar, updateEmailAndPassword } from '../../http/userAPI.js';
import { invalidateImageCache } from '../../utils/getImage';


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

export const handleUpdateAvatar = createAsyncThunk(
    'user/handleUpdateAvatar',
    async (croppedBlob, { rejectWithValue, getState }) => {
        try {
            const { user } = getState().user;

            const formData = new FormData();
            const file = new File([croppedBlob], "avatar.jpg", { type: "image/jpeg" });
            formData.append("avatar", file);
            const data = await updateAvatar(formData);

            if (user?.avatar) {
                invalidateImageCache('users_avatar', user.avatar);
            }

            return data;

        } catch (e) {
            return rejectWithValue(e?.code || 'Failed to update avatar');
        }
    }
);

export const handleRemoveAvatar = createAsyncThunk(
    'user/handleRemoveAvatar',
    async (_, { rejectWithValue, getState }) => {
        try {
            const { user } = getState().user;

            const data = await removeAvatar();

            if (user?.avatar) {
                invalidateImageCache('users_avatar', user.avatar);
            }

            return data;

        } catch (e) {
            return rejectWithValue(e?.code || 'Failed to remove avatar');
        }
    }
);

export const handleChangeEmailAndPassword = createAsyncThunk(
    'user/handleChangeEmailAndPassword',
    async ({ email, password }, { rejectWithValue, getState }) => {
        try {
            const { user } = getState().user;
            if (email === user.email && password === '') {
                return { user, token: localStorage.getItem('token') }
            }

            const data = await updateEmailAndPassword(email, password);
            return data;

        } catch (e) {
            return rejectWithValue(e?.code || 'Failed to change email and password');
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
        avatarVersion: 0,

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
            state.isLoading = false
        },

    },

    extraReducers: builder => {
        builder

            .addCase(handleRegistration.rejected, createThunkErrorHandler("REGISTRATION"))
            .addCase(handleRegistration.pending, handlePending)
            .addCase(handleRegistration.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuth = true
                state.user = action.payload.user
                localStorage.setItem('token', action.payload.token)
            })

            .addCase(handleLogin.rejected, createThunkErrorHandler("LOGIN"))
            .addCase(handleLogin.pending, handlePending)
            .addCase(handleLogin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuth = true
                state.user = action.payload.user
                localStorage.setItem('token', action.payload.token)
            })

            .addCase(handleUpdateAvatar.rejected, createThunkErrorHandler("UPDATE_AVATAR"))
            .addCase(handleUpdateAvatar.pending, handlePending)
            .addCase(handleUpdateAvatar.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.user
                state.avatarVersion += 1
                localStorage.setItem('token', action.payload.token)
            })

            .addCase(handleRemoveAvatar.rejected, createThunkErrorHandler("REMOVE_AVATAR"))
            .addCase(handleRemoveAvatar.pending, handlePending)
            .addCase(handleRemoveAvatar.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.user
                state.avatarVersion = 0
                localStorage.setItem('token', action.payload.token)
            })

            .addCase(handleChangeEmailAndPassword.rejected, createThunkErrorHandler("REGISTRATION"))
            .addCase(handleChangeEmailAndPassword.pending, handlePending)
            .addCase(handleChangeEmailAndPassword.fulfilled, (state, action) => {
                state.isLoading = false
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