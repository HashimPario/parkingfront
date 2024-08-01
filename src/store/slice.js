"use client"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUserData: '',
    userRole: '',
    count: 0,
    placeData:[]
}

const parkingSlice = createSlice({
    name: 'parking',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.currentUserData = action.payload;
            state.userRole = state.currentUserData.email === "admin@gmail.com" ? 'admin' : 'user';
            // console.log("Current User Logged In: ",state.currentUserData)
        },
        clearUser: (state, action) => {
            state.currentUserData = action.payload;
            state.userRole = action.payload;
        },
        setUserRole: (state, action) => {
            state.userRole = action.payload;
        },
        addPlaceData: (state, action) => {
            state.placeData = action.payload;
        },
    }
})

export const { addUser, clearUser,setUserRole, addPlaceData } = parkingSlice.actions;
export default parkingSlice.reducer;

