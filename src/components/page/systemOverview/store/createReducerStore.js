const createReducerStore = (reducer, initialState) => {
  let store = initialState;
  const listeners = new Set();
  const getSnapshot = () => store;
  // 換成 dispatch
  const dispatch = (action) => {
    store = reducer(store, action); // 這裡換成 reducer
    listeners.forEach((listener) => listener());
  };
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };
  return {
    getSnapshot,
    dispatch,
    subscribe,
  };
};
export default createReducerStore;
