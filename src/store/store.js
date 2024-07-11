import { configureStore } from "@reduxjs/toolkit";
import parkingSlice from './slice'

const store = configureStore({
    reducer:{
         park : parkingSlice,
    }
})


export default store;