import { Link } from 'react-router-dom';
import Button from '@/components/units/button';
import { pagesPathName } from '@/router';

export const GoBack = ({type="default"}) => {
  return (
    <Link to={pagesPathName.login.path}>
      <Button size="md" type={type} variant="default">
        返回
      </Button>
    </Link>
  );
};
