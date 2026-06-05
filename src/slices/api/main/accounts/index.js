import { createSlice } from '@reduxjs/toolkit';
import {
  getAccountsInfo,
  getAccountsOperators,
  postAccountsMicrosoftExchangeToken,
} from './indexHelper';

const omRole = {
  manager: { key: '管理者	', value: 'manager' },
  normal: { key: '一般用戶', value: 'viewer' },
  superUser: { key: '最高權限', value: 'admin' },
};

//初始值
const initialState = {
  id: null,
  microsoftData: {},
  // omRole: null,
  omRole: 'admin',
  omRoleStr: '',
  operators: [],
};

const accountsSlice = createSlice({
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
  initialState,
  name: 'accounts',
  reducers: {},
});

export { omRole };
export default accountsSlice.reducer;
