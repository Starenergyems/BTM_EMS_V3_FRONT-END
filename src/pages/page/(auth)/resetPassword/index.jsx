import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Flex, Form, Typography } from 'antd';
import Button from '@/components/units/button';
import { clearToken, postToken } from '@/slices/api/main/token/index';
import { getAccountsInfo } from '@/slices/api/main/accounts/indexHelper';
import { renderField } from '@/components/widgets/modalForm/indexHelper';
import { pagesPathName } from '@/router';
import logoEng from '@/assets/img/logo-with-eng-word.png';
import { GoBack } from '../components/goBack/index';
import ScopeStyle from '../indexStyle';
import { useHelpers } from './indexHelper';

function ResetPassword() {
  const dispatch = useDispatch();
  const apiDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData] = Form.useForm();

  const { formFields } = useHelpers({ formData });

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
          password: values.password,
          newPassword: values.newPassword,
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
        <h2 className="subtitle">新密碼設定</h2>
        <Form
          className="w-80 mg-t-15"
          form={formData}
          layout="vertical"
          onFinish={handleOnSubmit}
          requiredMark={false}
        >
          {formFields?.map((item, idx) => (
            <Form.Item key={`form-item-${idx}`} {...item.formItemAttr}>
              {renderField(item)}
            </Form.Item>
          ))}

          <Flex align="center" justify="center" gap={32}>
            <Button size="md" htmlType="submit" type="primary">
              送出
            </Button>
            <GoBack />
          </Flex>
        </Form>
      </Flex>
    </ScopeStyle>
  );
}

export default ResetPassword;
