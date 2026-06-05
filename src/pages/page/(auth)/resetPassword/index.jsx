import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import logoEng from '@/assets/img/logo-with-eng-word.png';
import Button from '@/components/units/button';
import { renderField } from '@/components/widgets/modalForm/indexHelper';
import { pagesPathName } from '@/router';
import { getAccountsInfo } from '@/slices/api/main/accounts/indexHelper';
import { clearToken, postToken } from '@/slices/api/main/token/index';
import { Flex, Form, Typography } from 'antd';
import { GoBack } from '../components/goBack/index';
import { useHelpers } from './indexHelper';
import ScopeStyle from '../indexStyle';

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
          newPassword: values.newPassword,
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
    <ScopeStyle align="center" justify="center">
      <Flex align="center" className="login-box" vertical>
        <Typography.Text style={{ textAlign: 'center' }}>
          <img alt="logo" className="logo" src={logoEng} />
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

          <Flex align="center" gap={32} justify="center">
            <Button htmlType="submit" size="md" type="primary">
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
