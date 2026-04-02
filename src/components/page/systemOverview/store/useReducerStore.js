import { useSyncExternalStore } from 'react';
import createReducerStore from './createReducerStore';
import { toDateTimeStr } from '@/utils/format';

const today = toDateTimeStr(new Date(), 'YYYY-MM-DD');

const initialState = {
  date: today,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'date':
      return {
        ...state,
        date: action.payload,
      };

    default:
      return state;
  }
};
const store = createReducerStore(reducer, initialState);
const loop = (v) => v;
export default function useTodoStore(selector = loop) {
  return useSyncExternalStore(store.subscribe, () =>
    selector(store.getSnapshot()),
  );
}
export const { dispatch } = store;
