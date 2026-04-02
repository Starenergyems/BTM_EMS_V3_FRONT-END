import useReducerStore, { dispatch } from "@/hooks/useReducerStore";

function Cart() {
  // 取 state 的值
  const state = useReducerStore();

  return (
    <div>
      <p>購物車: {state.count}</p>
    </div>
  );
}

export default Cart;
