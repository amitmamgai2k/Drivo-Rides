import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";
import { use } from "react";

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
  async (captainId = null, { rejectWithValue }) => {
    try {
      const endpoint = captainId
        ? `/admin/dashboard/captains/${captainId}` // single captain
        : '/admin/dashboard/captains'; // all captains

      const response = await axiosInstance.get(endpoint);
      console.log("captainsData", response.data);
      return response.data;
    } catch (error) {
      toast.error('Failed to load captains data');
      return rejectWithValue(error.response?.data);
    }
  }
);
export const updateCaptainData = createAsyncThunk(
    'admin/updateCaptainData',
    async ({ userID, data }, { rejectWithValue }) => {
      console.log("updateCaptainData", userID, data);

      try {
        const response = await axiosInstance.post(`/admin/captains/${userID}`,  data );

        return response.data;
      } catch (error) {
        toast.error('Failed to update captain data');
        return rejectWithValue(error.response?.data);
      }
    }
  );
  export const deleteCaptain = createAsyncThunk(
    'admin/deleteCaptain',
    async (userId, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.delete(`/admin/captains/${userId}`);

        return response.data;
      } catch (error) {
        toast.error('Failed to delete captain');
        return rejectWithValue(error.response?.data);
      }

    });

export const fetchUsersData = createAsyncThunk(
  'dashboard/fetchUsers',
  async (userId = null, { rejectWithValue }) => {
    try {
      const endpoint = captainId
        ? `/admin/dashboard/users/${userId}` // single user
        : '/admin/dashboard/user'; // all users

      const response = await axiosInstance.get(endpoint);
      console.log("UsersData", response.data);
      return response.data;
    } catch (error) {
      toast.error('Failed to load user data');
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
      .addCase(updateCaptainData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCaptainData.fulfilled, (state, action) => {
        state.loading = false;
        toast.success('Captain data updated successfully');

      })
      .addCase(updateCaptainData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update captain data';
      })
      .addCase(deleteCaptain.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCaptain.fulfilled, (state, action) => {
        state.loading = false;
        toast.success('Captain deleted successfully');
      })
      .addCase(deleteCaptain.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete captain';
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