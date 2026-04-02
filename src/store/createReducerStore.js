const createReducerStore = (reducer, initialState) => {
  let state = initialState;

  const listeners = new Set();

  const getSnapshot = () => state;
  
  // 換成 dispatch
  const dispatch = (action) => {
    state = reducer(state, action); // 這裡換成 reducer
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
