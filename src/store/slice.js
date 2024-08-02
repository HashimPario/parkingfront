"use client"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUserData: '',
    userRole: '',
    count: 0,
    placeData: []
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
        removePlaceData: (state, action) => {
            const { areaId, placeId } = action.payload;
            const areaIndex = state.placeData.findIndex(item => item.areaId === areaId);
            if (areaIndex > -1) {
                state.placeData[areaIndex].placeData = state.placeData[areaIndex].placeData.filter(place => place._id !== placeId);
            }
        },
        updatePlaceData: (state, action) => {
            const { areaId, placeId, updatedPlace } = action.payload;
            const areaIndex = state.placeData.findIndex(item => item.areaId === areaId);
            if (areaIndex > -1) {
              const placeIndex = state.placeData[areaIndex].placeData.findIndex(place => place._id === placeId);
              if (placeIndex > -1) {
                state.placeData[areaIndex].placeData[placeIndex] = updatedPlace;
              }
            }
          },
    }
})

export const { addUser, clearUser, setUserRole, addPlaceData,removePlaceData, updatePlaceData } = parkingSlice.actions;
export default parkingSlice.reducer;

