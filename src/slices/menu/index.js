import { createSlice } from "@reduxjs/toolkit";

//初始值
const initialState = {
  siderIsCollapsed: true,
  selectedKeys: location.pathname || [],
  seoncdarySelectedKeys: location.pathname || [],
};
const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setSiderCollapsed (state, action) {
      state.siderIsCollapsed = action.payload;
    },
    setSelectedKeys (state, action) {
      state.selectedKeys = action.payload;
    },
    setSeoncdarySelectedKeys (state, action) {
      state.seoncdarySelectedKeys = action.payload;
    },
  },
});

export const {
  init,
  setSiderCollapsed,
  setSelectedKeys,
  setSeoncdarySelectedKeys,
} = menuSlice.actions;
export default menuSlice.reducer;
