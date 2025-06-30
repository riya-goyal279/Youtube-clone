import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "./sidebarSlice";
import popularVideoSlice from "./popularVideoSlice";
import videoCategorySlice from "./videoCategorySlice";
import authSlice from "./authSlice";

const store = configureStore({
    reducer: {
        sidebar: sidebarSlice,
        popularVideos: popularVideoSlice,
        category: videoCategorySlice,
        auth: authSlice,
    }
});

export default store;