import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
    role: localStorage.getItem('role') || "",
    data: JSON.parse(localStorage.getItem('data') || '{}'),
    token: localStorage.getItem('token') || "",
};

export const Login = createAsyncThunk(
    'admin/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const { email, password } = credentials;
            console.log('email', email, password);


            const response = await axiosInstance.post('/admin/login', { email, password });


            toast.success('Logged In');

            return response.data;
        } catch (error) {
            console.log('Login error:', error);


            if (error.code === 'ERR_NETWORK') {
                toast.error('Network error: Please check your connection or server status');
                return rejectWithValue({ message: 'Network error: Unable to connect to server' });
            }


            toast.error(error.response?.data?.message || 'Login failed');
            return rejectWithValue(error.response?.data || { message: 'Unknown error occurred' });
        }
    }
);


const AdminAuth = createSlice({
    name: "AdminAuth",
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false;
            state.role = "";
            state.data = {};
            state.token = "";
            toast.success('Logged Out');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('role');
            localStorage.removeItem('data');
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(Login.pending, (state) => {

            })
            .addCase(Login.fulfilled, (state, action) => {
                state.isLoggedIn = true;

                state.role = state.role || "admin";
                state.data = state.data || {};
                state.token = action.payload.token;

                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('role', state.role);
                localStorage.setItem('data', JSON.stringify(state.data));
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(Login.rejected, (state) => {
                state.isLoggedIn = false;
                state.role = "";
                state.data = {};
                state.token = "";
            });
    }
});

export const { logout } = AdminAuth.actions;
export default AdminAuth.reducer;