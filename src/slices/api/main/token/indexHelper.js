import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/slices/api/setting";

const postToken = createAsyncThunk(
  "token/postToken",
  async ({ data, config }) => {
    const fetchData = await api.post("token", data, config);
    return fetchData.data;
  }
);
const postRefreshToken = createAsyncThunk(
  "token/postRefreshToken",
  async ({ data, config }) => {
    const fetchData = await api.post("token/refresh", data, config);
    return fetchData.data;
  }
);

export { postToken, postRefreshToken };
