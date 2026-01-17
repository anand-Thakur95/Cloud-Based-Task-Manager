import { createSlice } from "@reduxjs/toolkit";

const initailState = {
    user: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,


    isSidebarOpen: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initailState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = { ...action.payload, isAdmin: true }; // Assuming admin for testing
            localStorage.setItem("userInfo", JSON.stringify(state.user));
            
        },

        logout: (state) => {
            state.user = null;
            localStorage.removeItem("userInfo");
        },
        setOpenSidebar: (state, action) => {
            state.isSidebarOpen = action.payload;
        }
    }
});

export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;
export default authSlice.reducer;