import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Flex, Form } from 'antd';
import Button from '@/components/units/button';
import Typography from '@/components/units/typography';
import { renderField } from '@/components/widgets/modalForm/indexHelper';
import { clearToken, postToken } from '@/slices/api/main/token/index';
import { getAccountsInfo } from '@/slices/api/main/accounts/indexHelper';
import { pagesPathName } from '@/router';
import logoVertical from '@/assets/img/logo.png';
import { formFields } from './indexConfig';
import ScopeStyle from '../indexStyle';

function Login() {
  const dispatch = useDispatch();
  const apiDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData] = Form.useForm();
  // const [isSubmitted, setIsSubmitted] = useState(false);

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
        <div style={{ textAlign: 'center' }}>
          <img src={logoVertical} alt="logo" className="main-logo" />
        </div>
        <h2 className="subtitle">EMS 表後項目名稱</h2>
        <Typography size="sm">
          非經同意者，請勿隨意操作系統。違者須承擔法律責任
        </Typography>
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
            <Button
              type="primary"
              virants="outline"
              htmlType="submit"
              size="md"
            >
              登入
            </Button>
            <Link to={pagesPathName.sendEmail.path} className="forgot-password">
              忘記密碼
            </Link>
          </Flex>
        </Form>
      </Flex>
    </ScopeStyle>
  );
}

export default Login;
