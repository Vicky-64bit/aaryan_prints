import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Retrieve user info and token from localStorage if available
const userFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

// Check for an existing guest Id in the localStorage or generate a new One
// const initialGuestId = localStorage.getItem("guestId") || `guest_${new Date().getItem()}`;
// Fix this line
const initialGuestId = localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;

localStorage.setItem("guestId", initialGuestId);

// Initial state
const initialState = {
    user: userFromStorage,
    guestId: initialGuestId,
    loading: false,
    error: null,
};

// Async Thunk for User Login
export const loginUser = createAsyncThunk("auth/loginUser", async(userData, {rejectWithValue}) => {
    try {
        
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, userData);
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));
        localStorage.setItem("usertoken", response.data.token);

        return response.data.user; //Return the user object from the response
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


// Async Thunk for User Registeration
export const registerUser = createAsyncThunk("auth/registerUser", async(userData, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, userData);
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));
        localStorage.setItem("usertoken", response.data.token);

        return response.data.user; //Return the user object from the response
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Async thunk for user update
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (updatedData, { getState }) => {
    const { token } = getState().auth;
    // Example API call, replace with your backend
    const response = await fetch("/api/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return await response.json(); // should return updated user
  }
);

//Slice 
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.guestId = `guest_${new Date().getTime()}` //Reset guest Id on logout
            localStorage.removeItem("userInfo");
            localStorage.removeItem("userToken");
            localStorage.setItem("guestId", state.guestId); // Set new guest Id in localStoage
        },
        generateNewGuestId: (state) => {
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.setItem("guestId", state.guestId);
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true,
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false,
            state.user = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload.message;
        })
        .addCase(registerUser.pending, (state) => {
            state.loading = true,
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false,
            state.user = action.payload;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload.message;
        })
         .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
    }
});

export const {logout, generateNewGuestId} = authSlice.actions;
export default authSlice.reducer;