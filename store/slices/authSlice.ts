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

// Try to get initial state from localStorage if available
const getInitialState = (): AuthState => {
    if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('user');
        return {
            user: storedUser ? JSON.parse(storedUser) : null
        };
    }
    return { user: null };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: User }>) => {
            state.user = action.payload.user;
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            }
        },
        logout: (state) => {
            state.user = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
            }
        },
        updateUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(action.payload));
            }
        }
    }
});

export const { setCredentials, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;