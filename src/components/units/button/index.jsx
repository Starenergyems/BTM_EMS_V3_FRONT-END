import { Button as AntdButton } from 'antd';
import ScopeStyle from './indexStyle';

function Button({ size, children, className, ...buttonAttr }) {
  return (
    <ScopeStyle
      $size={size}
      $variant={buttonAttr.variant}
      className={className}
    >
      <AntdButton {...buttonAttr}>{children}</AntdButton>
    </ScopeStyle>
  );
}

export default Button;
