import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/slices/api/setting";

const postToken = createAsyncThunk(
  "token/postToken",
  async ({ config, data }) => {
    const fetchData = await api.post("token", data, config);
    return fetchData.data;
  }
);
const postRefreshToken = createAsyncThunk(
  "token/postRefreshToken",
  async ({ config, data }) => {
    const fetchData = await api.post("token/refresh", data, config);
    return fetchData.data;
  }
);

export { postRefreshToken, postToken };
