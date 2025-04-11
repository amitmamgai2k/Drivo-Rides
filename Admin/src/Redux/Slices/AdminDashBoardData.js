import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
  metricsData: [],
  totalRides: 0,
  totalUsers: 0,
  totalDrivers: 0,
  totalEarnings: 0,
  totalBookings: 0,
  monthlyData: [],
  rideStatusData: [],
  weeklyRides: [],
  loading: false,
  error: null
};

// Async thunk to fetch all dashboard data
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/dashboard');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load dashboard data');
      return rejectWithValue(error.response?.data || { message: 'Something went wrong' });
    }
  }
);

// Optional: Separate thunks for individual sections if needed
export const fetchMetricsData = createAsyncThunk(
  'dashboard/fetchMetrics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/dashboard/metrics');
      return response.data;
    } catch (error) {
      toast.error('Failed to load metrics data');
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchChartData = createAsyncThunk(
  'dashboard/fetchCharts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/dashboard/charts');
      return response.data;
    } catch (error) {
      toast.error('Failed to load chart data');
      return rejectWithValue(error.response?.data);
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // Reset dashboard state
    resetDashboard: (state) => {
      state.loading = false;
      state.error = null;
    },

    // Optional: Manually update specific metrics if needed
    updateMetric: (state, action) => {
      const { metric, value } = action.payload;
      state[metric] = value;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchDashboardData
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;

        // Update all dashboard data from the response
        const data = action.payload.data;

        // Update metrics
        state.totalRides = data.totalRides || 0;
        state.totalUsers = data.totalUsers || 0;
        state.totalDrivers = data.totalDrivers || 0;
        state.totalEarnings = data.totalEarnings || 0;
        state.totalBookings = data.totalBookings || 0;

        // Update charts data
        state.metricsData = data.metricsData || [];
        state.monthlyData = data.monthlyData || [];
        state.rideStatusData = data.rideStatusData || [];
        state.weeklyRides = data.weeklyRides || [];
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch dashboard data';
      })

      // Handle fetchMetricsData if needed
      .addCase(fetchMetricsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMetricsData.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload.data;


        state.metricsData = data.metricsData || [];
        state.totalRides = data.totalRides || state.totalRides;
        state.totalUsers = data.totalUsers || state.totalUsers;
        state.totalDrivers = data.totalDrivers || state.totalDrivers;
        state.totalEarnings = data.totalEarnings || state.totalEarnings;
        state.totalBookings = data.totalBookings || state.totalBookings;
      })
      .addCase(fetchMetricsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch metrics data';
      })

      // Handle fetchChartData if needed
      .addCase(fetchChartData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload.data;

        // Update charts data
        state.monthlyData = data.monthlyData || state.monthlyData;
        state.rideStatusData = data.rideStatusData || state.rideStatusData;
        state.weeklyRides = data.weeklyRides || state.weeklyRides;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch chart data';
      });
  }
});

export const { resetDashboard, updateMetric } = dashboardSlice.actions;
export default dashboardSlice.reducer;