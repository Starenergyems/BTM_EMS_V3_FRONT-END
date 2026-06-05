export const formFields = [
  {
    componentProps: {
      inputAttr: {
        placeholder: '請輸入用戶名稱',
      },
    },
    formItemAttr: {
      label: 'User Name',
      name: 'username',
      rules: [{ message: '請輸入用戶名稱', required: true }],
    },
    variants: 'input',
  },
  {
    componentProps: {
      inputAttr: {
        placeholder: '請輸入您的密碼',
        type: 'password',
      },
    },
    formItemAttr: {
      label: 'Password',
      name: 'password',
      rules: [{ message: '請輸入您的密碼', required: true }],
    },
    variants: 'input',
  },
];
