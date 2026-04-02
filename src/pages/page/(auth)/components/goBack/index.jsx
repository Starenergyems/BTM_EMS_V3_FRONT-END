import { Link } from 'react-router-dom';
import { pagesPathName } from '@/router';
import Button from '@/components/units/button';

export const GoBack = ({type="default"}) => {
  return (
    <Link to={pagesPathName.login.path}>
      <Button type={type} variant="default" size="md">
        返回
      </Button>
    </Link>
  );
};
