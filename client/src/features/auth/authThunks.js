import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const LOGIN_URL = `${API_BASE_URL}/auth/login`;
const REGISTER_URL = `${API_BASE_URL}/auth/register`;

export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials, thunkAPI) => {
        try {
            const response = await axios.post(LOGIN_URL, credentials);
            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", user);

            return { token, user };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "An unexpected error occurred" }
            );
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            console.log(userData)
            console.log(REGISTER_URL)
            const response = await axios.post(REGISTER_URL, userData);
            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", user);

            return { token, user };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "An unexpected error occurred" }
            );
        }
    }
);
