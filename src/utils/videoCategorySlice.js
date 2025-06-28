import { createSlice } from "@reduxjs/toolkit";

const videoCategorySlice = createSlice({
    name: "category",
    initialState: {
        categoryId: null,
        categoryTitle: null,
    },
    reducers: {
        setCategoryId(state, {payload}) {
            state.categoryId = payload.id;
            state.categoryTitle = payload.title;
        },
    }
});

export const { setCategoryId } = videoCategorySlice.actions;
export default videoCategorySlice.reducer;