import { createSlice } from '@reduxjs/toolkit';
import { LoginState } from '../../utils/type';

const initialState: LoginState = {
  isAuthenticated: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginState(state, action) {
      state.isAuthenticated = action.payload;;
    },
  },
});

export const { loginState } = loginSlice.actions;

export default loginSlice.reducer;