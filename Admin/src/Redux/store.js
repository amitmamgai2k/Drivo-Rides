import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Slices/AdminAuth'
import dashboardReducer from './Slices/AdminDashBoardData'

const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer
    },
    devTools: true
});

export default store;