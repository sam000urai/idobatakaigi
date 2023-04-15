import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    uid: '',
    email: '',
    displayName: '',
    photoUrl: '',
  },
  loggedInUsers: [], // ログインしているユーザー一覧を追加
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
