import { createSlice } from '@reduxjs/toolkit';
import { color } from '@/styles/variable/indexStyle';

//初始值
const layoutState = {
  background: `linear-gradient(180deg, ${color.themeBlue} 0%,  ${color.themeBlack} 100%)`,
  interval: 180,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState: layoutState,
  reducers: {
    setBackground(state, action) {
      state.background = action.payload;
    },
    setInterval(state, action) {
      state.interval = action.payload;
    },
  },
});

export const { setBackground, setInterval } = layoutSlice.actions;
export default layoutSlice.reducer;
