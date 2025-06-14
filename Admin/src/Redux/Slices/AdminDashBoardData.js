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
  rideStatusDatas: [],
  monthlyData: [],
  weeklyData: [],
  payments: [],
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
      const endpoint = userId
        ? `/admin/dashboard/users/${userId}` // single user
        : '/admin/dashboard/users'; // all users

      const response = await axiosInstance.get(endpoint);
      console.log("UsersData", response.data);
      return response.data;


    } catch (error) {
      toast.error('Failed to load user data');
      return rejectWithValue(error.response?.data);
    }
  }
);
export const updateUserData = createAsyncThunk(
  'admin/updateUserData',
  async ({ userID, data }, { rejectWithValue }) => {
    console.log("updateUserData", userID, data);

    try {
      const response = await axiosInstance.post(`/admin/users/${userID}`,  data );

      return response.data;
    } catch (error) {
      toast.error('Failed to update user data');
      return rejectWithValue(error.response?.data);
    }
  }
);
export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/admin/users/${userId}`);

      return response.data;
    } catch (error) {
      toast.error('Failed to delete user');
      return rejectWithValue(error.response?.data);
    }

  });



export const fetchRidesStatusData = createAsyncThunk(
  'dashboard/fetchRidesStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/dashboard/ridesStatus');
      console.log("RidesStatusData", response.data);
      return response.data;
    } catch (error) {
      toast.error('Failed to load rides status data');
      return rejectWithValue(error.response?.data);
    }
  }
);
export const fetchSupportTickets = createAsyncThunk(
  'dashboard/fetchSupportTickets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/dashboard/supportTickets');
      console.log("SupportTicketsData", response.data);
      return response.data;
    } catch (error) {
      toast.error('Failed to load support tickets data');
      return rejectWithValue(error.response?.data);
    }
  }
);
export const resolveTicket = createAsyncThunk(
  'admin/resolveTicket',
  async (ticketId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/admin/dashboard/supportTickets/${ticketId}/resolve`);
      return response.data;
    } catch (error) {
      toast.error('Failed to resolve support ticket');
      return rejectWithValue(error.response?.data);
    }
  }
);
export const fetchmonthlyData = createAsyncThunk(
  'dashboard/fetchMonthlyData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/dashboard/monthlyData');
      return response.data;
    } catch (error) {
      toast.error('Failed to load monthly data');
      return rejectWithValue(error.response?.data);
    }
  }
);
export const fetchWeeklyRides = createAsyncThunk(
  'dashboard/fetchWeeklyRides',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/dashboard/weeklyRides');
      return response.data;
    } catch (error) {
      toast.error('Failed to load weekly rides');
      return rejectWithValue(error.response?.data);
    }
  }
);
export const fetchPayments = createAsyncThunk(
  'dashboard/fetchPayments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/dashboard/payments');
      return response.data;
    } catch (error) {
      toast.error('Failed to load payments data');
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
        console.log("usersData", action.payload.data);

        state.usersData = action.payload.data;
      }
      )
      .addCase(fetchUsersData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch users data';
      }
      )
      .addCase(updateUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.loading = false;

        toast.success('User data updated successfully');
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message || 'Failed to update user data';
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        toast.success('User deleted successfully');
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete user';
      })
      .addCase(fetchRidesStatusData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRidesStatusData.fulfilled, (state, action) => {
        state.loading = false;
        console.log("RidesStatusData", action.payload.data);
        state.ridesStatusDatas = action.payload.data;
      })
      .addCase(fetchRidesStatusData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch rides status data';
      }
      )
      .addCase(fetchSupportTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSupportTickets.fulfilled, (state, action) => {
        state.loading = false;
        console.log("SupportTicketsData", action.payload.data);
        state.supportTicketsData = action.payload.data;
      })
      .addCase(fetchSupportTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch support tickets data';
      })
      .addCase(resolveTicket.pending, (state) => {
        state.loading = true;
      })
      .addCase(resolveTicket.fulfilled, (state, action) => {
        state.loading = false;
        toast.success('Support ticket resolved successfully');
      })
      .addCase(resolveTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to resolve support ticket';
      })
      .addCase(fetchmonthlyData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchmonthlyData.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlyData = action.payload.data;
      })
      .addCase(fetchmonthlyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch monthly data';
      })
      .addCase(fetchWeeklyRides.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeeklyRides.fulfilled, (state, action) => {
        state.loading = false;

        state.weeklyData = action.payload.data;
      })
      .addCase(fetchWeeklyRides.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch weekly data';
      })
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload.data;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch payments data';
      });
  }
});


export const { resetDashboard, updateMetric } = dashboardSlice.actions;
export default dashboardSlice.reducer;