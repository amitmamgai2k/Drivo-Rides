import {configureStore} from '@reduxjs/toolkit'
import authReducer from './Slices/AdminAuth'

const store  = configureStore({
    reducer : {
      auth : authReducer,



    },
    devTools : true

});

export default store;