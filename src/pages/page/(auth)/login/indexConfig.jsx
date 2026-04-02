export const formFields = [
  {
    formItemAttr: {
      label: 'User Name',
      name: 'username',
      rules: [{ required: true, message: '請輸入用戶名稱' }],
    },
    variants: 'input',
    componentProps: {
      inputAttr: {
        placeholder: '請輸入用戶名稱',
      },
    },
  },
  {
    formItemAttr: {
      label: 'Password',
      name: 'password',
      rules: [{ required: true, message: '請輸入您的密碼' }],
    },
    variants: 'input',
    componentProps: {
      inputAttr: {
        placeholder: '請輸入您的密碼',
        type: 'password',
      },
    },
  },
];
