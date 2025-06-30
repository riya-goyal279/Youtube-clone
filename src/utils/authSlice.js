import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedIn(state, {payload}) {
            state.isLoggedIn = payload;
        },
    }
});

export const { setIsLoggedIn } = authSlice.actions;
export default authSlice.reducer;