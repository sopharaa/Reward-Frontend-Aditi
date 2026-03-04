import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
    id: number | null;
    name: string | null;
    profileImage: string | null;
    accessToken: string | null;
    refreshToken: string | null;
}

interface UserState {
    id: number | null;
    name: string | null;
    email: string | null;
    companyId: number | null;
    companyName: string | null;
    points: number | null;
    profileImage: string | null;
    accessToken: string | null;
    refreshToken: string | null;
}

interface AuthState {
    admin: AdminState | null;
    user: UserState | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    admin: null,
    user: null,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAdmin(state, action: PayloadAction<AdminState>) {
            state.admin = action.payload;
            state.error = null;
        },
        clearAdmin(state) {
            state.admin = null;
            state.error = null;
        },
        setUser(state, action: PayloadAction<UserState>) {
            state.user = action.payload;
            state.error = null;
        },
        clearUser(state) {
            state.user = null;
            state.error = null;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
});

export const { setAdmin, clearAdmin, setUser, clearUser, setError } = authSlice.actions;
export default authSlice.reducer;
