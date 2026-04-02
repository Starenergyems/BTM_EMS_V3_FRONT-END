import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Flex, Form, Typography } from 'antd';
import Button from '@/components/units/button';
import { clearToken, postToken } from '@/slices/api/main/token/index';
import { getAccountsInfo } from '@/slices/api/main/accounts/indexHelper';
import { pagesPathName } from '@/router';
import logoEng from '@/assets/img/logo-with-eng-word.png';
import FormInput from '@/components/units/form/input/index';
import ScopeStyle from '../indexStyle';
import { GoBack } from '../components/goBack';

function SendEmail() {
  const dispatch = useDispatch();
  const apiDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData] = Form.useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  //表單送出
  async function handleOnSubmit(values) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i); // 獲取第 i 個鍵
      if (key.includes('msal')) {
        localStorage.removeItem(key);
      }
    }
    dispatch(clearToken());
    const postTokenRes = await apiDispatch(
      postToken({
        data: {
          username: values.username,
          password: values.password,
        },
      }),
    ).unwrap();
    if (postTokenRes?.access) {
      await apiDispatch(getAccountsInfo()).unwrap();
      if (
        location.pathname === pagesPathName.login.path ||
        location.pathname === `${pagesPathName.login.path}/`
      ) {
        navigate(pagesPathName.home.path);
      }
    }
  }

  return (
    <ScopeStyle justify="center" align="center">
      <Flex className="login-box" vertical align="center">
        <Typography.Text style={{ textAlign: 'center' }}>
          <img src={logoEng} alt="logo" className="logo" />
        </Typography.Text>
        <h2 className="subtitle">重置密碼</h2>
        <Form
          className="w-80 mg-t-15"
          form={formData}
          layout="vertical"
          onFinish={handleOnSubmit}
          requiredMark={false}
          validateTrigger={isSubmitted ? 'onChange' : 'onSubmit'}
        >
          <Form.Item
            label=""
            name="username"
            rules={[{ required: true, message: '請輸入您的註冊信箱' }]}
          >
            <FormInput
              inputAttr={{
                placeholder: '請輸入您的註冊信箱',
              }}
              styles={{
                input: { width: '100%' },
              }}
            />
          </Form.Item>
          <Form.Item className="mg-t-20">
            <Flex align="center" justify="center" gap={32}>
              <Button
                type="primary"
                size="md"
                onClick={() => setIsSubmitted(true)}
              >
                送出
              </Button>
              <GoBack />
            </Flex>
          </Form.Item>
        </Form>
      </Flex>
    </ScopeStyle>
  );
}

export default SendEmail;
