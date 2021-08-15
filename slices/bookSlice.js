import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: []
}

const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        bookNow: (state, action) => {
            state.items = [...state.items, action.payload]
        },
        removeStay: (state, action) => {
            state.items = []
        }
    }
});

export const { bookNow, removeStay } = bookSlice.actions

export const selectItems = (state) => state.book.items

export default bookSlice.reducer