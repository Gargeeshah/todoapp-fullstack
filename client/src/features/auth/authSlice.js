import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authThunks";

const initialState = {
    token: null,
    user: null,
    loading: false,
    registrationErrors: [],
    loginError: null,
    registrationSuccess: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.registrationErrors = [];
            state.loginError = null;
        },
        clearSuccess: (state) => {
            state.registrationSuccess = false;
        },
        resetAuthState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.loading = false;
                state.loginError = null;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.loginError = action.payload.message;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.loading = false;
                state.registrationErrors = [];
                state.registrationSuccess = true;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.registrationErrors = Array.isArray(action.payload.message) ? action.payload.message : [action.payload.message];
            });
    },
});

export const { clearErrors, clearSuccess, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
