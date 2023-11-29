import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userName: 'User',
  },
  reducers: {
    changeName(state, action) {
      state.userName = action.payload;
    }
  }
});

export const {
  changeName,
} = userSlice.actions;

export default userSlice.reducer;
