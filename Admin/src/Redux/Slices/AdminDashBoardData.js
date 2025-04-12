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
export const fetchRecentRides = createAsyncThunk(
  'dashboard/fetchRecentRides',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/dashboard/recentRides');

      return response.data;
    } catch (error) {
      toast.error('Failed to load recent rides');
      return rejectWithValue(error.response?.data);
    }


  }
);
export const fetchRideDataWithID = createAsyncThunk(
  'dashboard/fetchRideDataWithID',
  async (rideId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/dashboard/recentRides/${rideId}`);
      return response.data;
    } catch (error) {
      toast.error('Failed to load ride data');
      return rejectWithValue(error.response?.data);
    }
  }
);
export const fetchCaptainsData = createAsyncThunk(
  'dashboard/fetchCaptains',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/dashboard/captains');
      console.log("captainsData", response.data);
      return response.data;
    } catch (error) {
      toast.error('Failed to load captains data');
      return rejectWithValue(error.response?.data);
    }
  }
);
export const fetchUsersData = createAsyncThunk(
  'dashboard/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/dashboard/users');
      return response.data;
    } catch (error) {
      toast.error('Failed to load users data');
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
      .addCase(fetchMetricsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMetricsData.fulfilled, (state, action) => {
        state.loading = false;

        // Handle the actual structure from your backend
        if (action.payload && action.payload.data) {
          state.metricsData = action.payload.data;
        } else {
          state.metricsData = {};
        }
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
      })
      .addCase(fetchRecentRides.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecentRides.fulfilled, (state, action) => {
        state.loading = false;


        state.recentRides = action.payload.data;
      })
      .addCase(fetchRecentRides.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch recent rides';
      })
      .addCase(fetchRideDataWithID.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRideDataWithID.fulfilled, (state, action) => {
        state.loading = false;
        state.rideDataWithID = action.payload.data;
      })
      .addCase(fetchRideDataWithID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch ride data';
      })
      .addCase(fetchCaptainsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCaptainsData.fulfilled, (state, action) => {
        state.loading = false;
        console.log("captainsData", action.payload.data);

        state.captainsData = action.payload.data;
      })
      .addCase(fetchCaptainsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch captains data';
      })
      .addCase(fetchUsersData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsersData.fulfilled, (state, action) => {
        state.loading = false;
        state.usersData = action.payload.data;
      }
      )
      .addCase(fetchUsersData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch users data';
      }
      );
  }
});

export const { resetDashboard, updateMetric } = dashboardSlice.actions;
export default dashboardSlice.reducer;