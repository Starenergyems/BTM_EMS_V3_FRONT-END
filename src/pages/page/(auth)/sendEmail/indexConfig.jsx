export const formFields = [
  {
    formItemAttr: {
      label: '',
      name: 'email',
      rules: [{ required: true, message: '請輸入您的註冊信箱' }],
    },
    variants: 'input',
    componentProps: {
      inputAttr: {
        placeholder: '請輸入您的註冊信箱',
      },
    },
  },
  {
    formItemAttr: {
      label: '',
      name: 'password',
      rules: [{ required: true, message: '請輸入您的金鑰' }],
    },
    variants: 'input',
    componentProps: {
      inputAttr: {
        placeholder: '請輸入您的金鑰',
        type: 'password',
      },
    },
  },
];
