import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  userName: string | null;
  avatarUrl: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userName: null,
  avatarUrl: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ userName: string; avatarUrl: string }>) => {
      state.isAuthenticated = true;
      state.userName = action.payload.userName;
      state.avatarUrl = action.payload.avatarUrl;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.userName = null;
      state.avatarUrl = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
