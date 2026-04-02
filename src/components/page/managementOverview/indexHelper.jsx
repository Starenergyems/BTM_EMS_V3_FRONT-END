import { accountDatas, userDatas } from '@/fake-api/account';

// useHelpers 為最外層 function，function 內區塊的撰寫順序由上而下為：
// 1. useCallback 需要相依的 function
// 2. api function
// 3. 一般function

function useHelpers({ setState }) {
  const getDatas = async () => {
    const user = await userDatas;
    const accounts = await accountDatas;

    setState((prevState) => {
      return {
        ...prevState,
        user: [user?.data],
        accounts: accounts?.data,
      };
    });
  };

  return {
    getDatas,
  };
}

export { useHelpers };
