import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "./sidebarSlice";
import popularVideoSlice from "./popularVideoSlice";
import videoCategorySlice from "./videoCategorySlice";

const store = configureStore({
    reducer: {
        sidebar: sidebarSlice,
        popularVideos: popularVideoSlice,
        category: videoCategorySlice,
    }
});

export default store;