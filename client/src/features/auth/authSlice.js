import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', { email, password });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers:  (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

// const authSlice = createSlice({
//     name: 'auth',
//     initialState: { token: null, user: null },
//     reducers: {
//         setToken: (state, action) => {
//             state.token = action.payload;
//             localStorage.setItem('token', action.payload);
//         },
//         logout: (state) => {
//             state.token = null;
//             state.user = null;
//             localStorage.removeItem('token');
//         },
//         setUser: (state, action) => {
//             state.user = action.payload;
//         }
//     }
// });

// export const { setToken, logout, setUser } = authSlice.actions;
// export default authSlice.reducer;
