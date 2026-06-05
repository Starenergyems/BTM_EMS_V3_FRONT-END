import { createSlice } from "@reduxjs/toolkit";

//初始值
const initialState = {
  selectedKeys: location.pathname || [],
  seoncdarySelectedKeys: location.pathname || [],
  siderIsCollapsed: true,
};
const menuSlice = createSlice({
  initialState,
  name: "menu",
  reducers: {
    setSelectedKeys (state, action) {
      state.selectedKeys = action.payload;
    },
    setSeoncdarySelectedKeys (state, action) {
      state.seoncdarySelectedKeys = action.payload;
    },
    setSiderCollapsed (state, action) {
      state.siderIsCollapsed = action.payload;
    },
  },
});

export const {
  init,
  setSelectedKeys,
  setSeoncdarySelectedKeys,
  setSiderCollapsed,
} = menuSlice.actions;
export default menuSlice.reducer;
