import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: JSON.parse(localStorage.getItem('data')) || {},
};
export const AdminLogin = createAsyncThunk('admin/login',async (data)=>{
    try {
        const response = await axiosInstance.post('/admin/login',data);
        await toast.promise(response.data.message,{loading: 'Loading...',success: 'Logged In',error: 'Invalid Credentials'});
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
        return error.response.data;

    }
});
const AdminAuth = createSlice({
    name: "AdminAuth",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(AdminLogin.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.role = action.payload.role;
            state.data = action.payload.data;
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('role', action.payload.role);
            localStorage.setItem('data', JSON.stringify(action.payload.data));


        })
    }

});
export const { } = AdminAuth.actions;
export default AdminAuth.reducer;
