import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        showSidebar: false,
    },
    reducers: {
        toggleSidebar(state) {
            state.showSidebar = !state.showSidebar;
        },
        closeSidebar(state) {
            state.showSidebar = false;
        }
    }
});

export const { toggleSidebar, closeSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
