import { useNavigate } from 'react-router-dom';
import logoEng from '@/assets/img/logo-with-eng-word.png';
import { pagesPathName } from '@/router';
import { Flex, Typography } from 'antd';
import { GoBack } from '../components/goBack/index';
import ScopeStyle from '../indexStyle';

function ResetSuccess() {
  const navigate = useNavigate();

  function backToLogin() {
    navigate(pagesPathName.login.path);
  }

  return (
    <ScopeStyle align="center" justify="center">
      <Flex align="center" className="login-box" vertical>
        <Typography.Text style={{ textAlign: 'center' }}>
          <img alt="logo" className="logo" src={logoEng} />
        </Typography.Text>
        <h2 className="subtitle">變更成功</h2>
        <GoBack type="primary"/>
        {/* <Button
          type="primary"
          htmlType="submit"
          className="btn-login mg-t-30"
          onClick={backToLogin}
        >
          返回
        </Button> */}
      </Flex>
    </ScopeStyle>
  );
}

export default ResetSuccess;
