import { createSlice } from '@reduxjs/toolkit';
import {
  getAccountsInfo,
  getAccountsOperators,
  postAccountsMicrosoftExchangeToken,
} from './indexHelper';

const omRole = {
  superUser: { key: '最高權限', value: 0 },
  manager: { key: '管理者	', value: 1 },
  normal: { key: '一般用戶', value: 2 },
};

//初始值
const initialState = {
  id: null,
  // omRole: null,
  omRole: 0,
  omRoleStr: '',
  operators: [],
  microsoftData: {},
};

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAccountsInfo.fulfilled, (state, action) => {
      const { id, omRole, omRoleStr } = action.payload;
      state.id = id;
      state.omRole = omRole;
      state.omRoleStr = omRoleStr;
    });
    builder.addCase(
      postAccountsMicrosoftExchangeToken.fulfilled,
      (state, action) => {
        const { data } = action.payload;
        state.microsoftData = { ...data };
      },
    );
    builder.addCase(getAccountsOperators.fulfilled, (state, action) => {
      const { operators } = action.payload;
      state.operators = operators;
    });
  },
});

export { omRole };
export default accountsSlice.reducer;
