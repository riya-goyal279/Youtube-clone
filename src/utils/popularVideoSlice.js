import { createSlice } from "@reduxjs/toolkit";
const popularVideoSlice = createSlice({
    name: "popularVideos",
    initialState: {
        videos: [],
    },
    reducers: {
        setVideos(state, {payload}) {
            state.videos = [...state.videos, ...payload];
        },
        emptyVideos(state) {
            state.videos = [];
        }
    }
});

export const { setVideos, emptyVideos } = popularVideoSlice.actions;
export default popularVideoSlice.reducer;