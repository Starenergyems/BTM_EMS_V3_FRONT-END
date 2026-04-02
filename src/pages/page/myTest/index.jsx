import useReducerStore, { dispatch } from '@/hooks/useReducerStore';

import Cart from './cart';

const Button = () => {
  return (
    <button
      onClick={() => {
        dispatch({ type: 'increment' });
      }}
    >
      increment
    </button>
  );
};

const AddTextButton = () => {
  return (
    <button
      onClick={() => {
        dispatch({ type: 'text', payload: 'new text' });
      }}
    >
      Change Text
    </button>
  );
};

function MyTest() {
  // 取 state 的值
  const state = useReducerStore();

  return (
    <div>
      <h1>MyTest</h1>
      <Button />
      <AddTextButton />
      <Cart />
      <p>Text: {state.text}</p>
    </div>
  );
}

export default MyTest;
