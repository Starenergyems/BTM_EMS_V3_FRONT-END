import toast from 'react-hot-toast';

// 顯示成功訊息
export const successMsgHandler = (message = '更新成功') => {
  toast.success(message);
};

export const errorMsgHandler = (errors, setError) => {
  if (errors?.length > 0) {
    errors.forEach((err) => {
      setError([
        {
          name: err.loc[1],
          errors: [err.msg],
        },
      ]);
    });
  } else {
    toast.error('更新失敗，請稍後再試');
  }
};

// 清理輸入值，只保留數字
export const inputNumHandler = (e) => {
  // 移除所有非數字和非小數點的字符
  let value = e.target.value.replace(/[^0-9]/g, '');

  // 更新輸入值
  e.target.value = value;
};
