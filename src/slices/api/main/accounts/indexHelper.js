import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/slices/api/setting";

const getAccountsInfo = createAsyncThunk(
  "accounts/getAccountsInfo",
  async ({ config } = {}) => {
    const fetchData = await api.get("accounts/info", config);
    return fetchData.data;
  }
);
//Microsoft登入後的access token轉為平常在使用的access token
const postAccountsMicrosoftExchangeToken = createAsyncThunk(
  "accounts/postAccountsMicrosoftExchangeToken",
  async ({ data, config }) => {
    const fetchData = await api.post(
      "accounts/microsoft/exchange_token",
      data,
      config
    );
    return fetchData.data;
  }
);
//忘記密碼重設驗證信前，帳號驗證
const postAccountsSendResetEmail = createAsyncThunk(
  "accounts/postAccountsSendResetEmail",
  async ({ data, config }) => {
    const fetchData = await api.post("accounts/send_reset_email", data, config);
    return fetchData.data;
  }
);
//密碼重設
const postAccountsPasswordReset = createAsyncThunk(
  "accounts/postAccountsPasswordReset",
  async ({ data, config }) => {
    const fetchData = await api.post("accounts/password_reset", data, config);
    return fetchData.data;
  }
);
const getAccountsOperators = createAsyncThunk(
  "accounts/getAccountsOperators",
  async ({ config } = {}) => {
    const fetchData = await api.get("accounts/operators", config);
    return fetchData.data;
  }
);

export {
  getAccountsInfo,
  getAccountsOperators,
  postAccountsMicrosoftExchangeToken,
  postAccountsPasswordReset,
  postAccountsSendResetEmail,
};
