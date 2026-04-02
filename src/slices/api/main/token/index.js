import { createSlice } from "@reduxjs/toolkit";
import { pagesPathName, router } from "@/router";
import toast from "react-hot-toast";
import { postToken, postRefreshToken } from "./indexHelper";
import { postAccountsMicrosoftExchangeToken } from "../accounts/indexHelper";

//state初始值
const initialState = {
  access: localStorage.getItem("access") || "",
  refresh: localStorage.getItem("refresh") || "",
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    clearToken(state) {
      state.access = "";
      state.refresh = "";
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
    restrictMultipleToken(state) {
      const accessToken = localStorage.getItem("access");
      if (state.access && accessToken && state.access !== accessToken) {
        state.access = "";
        state.refresh = "";
        router.navigate(pagesPathName.login.path);
        toast.dismiss();
        toast.error("請勿開啟多個視窗進行登入操作");
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(postToken.fulfilled, (state, action) => {
      const { access, refresh } = action.payload;
      state.access = access;
      state.refresh = refresh;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
    });
    builder.addCase(postRefreshToken.fulfilled, (state, action) => {
      const { access, refresh } = action.payload;
      state.access = access;
      state.refresh = refresh;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
    });
    builder.addCase(postRefreshToken.rejected, (state) => {
      state.access = "";
      state.refresh = "";
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    });
    builder.addCase(
      postAccountsMicrosoftExchangeToken.fulfilled,
      (state, action) => {
        const {
          data: { accessToken, refreshToken },
        } = action.payload;
        state.access = accessToken;
        state.refresh = refreshToken;
        localStorage.setItem("access", accessToken);
        localStorage.setItem("refresh", refreshToken);
      }
    );
  },
});

export { postToken, postRefreshToken };
export const { clearToken, restrictMultipleToken } = tokenSlice.actions;
export default tokenSlice.reducer;
