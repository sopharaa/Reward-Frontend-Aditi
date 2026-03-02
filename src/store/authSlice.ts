import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
    id: number | null;
    name: string | null;
    profileImage: string | null;
    accessToken: string | null;
    refreshToken: string | null;
}

interface AuthState {
    admin: AdminState | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    admin: null,
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
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
});

export const { setAdmin, clearAdmin, setError } = authSlice.actions;
export default authSlice.reducer;
