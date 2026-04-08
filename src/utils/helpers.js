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

// 密碼驗證規則

export const passwordValidationRules = (value) => {
  if (!value) return Promise.resolve();

  if (value.length < 8 || value.length > 16) {
    return Promise.reject(new Error('密碼長度需為 8 至 16 個字元'));
  }
  if (!/[A-Z]/.test(value)) {
    return Promise.reject(new Error('密碼需至少包含一個大寫字母（A-Z）'));
  }
  if (!/[a-z]/.test(value)) {
    return Promise.reject(new Error('密碼需至少包含一個小寫字母（a-z）'));
  }
  if (!/[0-9]/.test(value)) {
    return Promise.reject(new Error('密碼需至少包含一個數字（0-9）'));
  }
  if (!/[!@#$%^&*()_+\-={}|;:,.<>?]/.test(value)) {
    return Promise.reject(
      new Error('密碼需至少包含一個特殊符號（如 ! @ # $ % ^ & * ...）'),
    );
  }

  return Promise.resolve();
};
