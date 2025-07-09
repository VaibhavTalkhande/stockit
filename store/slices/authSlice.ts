import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
    _id: string;
    username: string;
    email: string;
    storeName: string;
}

interface AuthState {
    user: User | null;
}

// Initial state without localStorage
const initialState: AuthState = { user: null };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: User }>) => {
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.user = null;
        },
        updateUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        }
    }
});

export const { setCredentials, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;