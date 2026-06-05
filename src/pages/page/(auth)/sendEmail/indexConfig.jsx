export const formFields = [
  {
    componentProps: {
      inputAttr: {
        placeholder: '請輸入您的註冊信箱',
      },
    },
    formItemAttr: {
      label: '',
      name: 'email',
      rules: [{ message: '請輸入您的註冊信箱', required: true }],
    },
    variants: 'input',
  },
  {
    componentProps: {
      inputAttr: {
        placeholder: '請輸入您的金鑰',
        type: 'password',
      },
    },
    formItemAttr: {
      label: '',
      name: 'password',
      rules: [{ message: '請輸入您的金鑰', required: true }],
    },
    variants: 'input',
  },
];
