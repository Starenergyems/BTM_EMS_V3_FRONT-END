import { forwardRef } from 'react';

import ScopeStyle from './indexStyle';

function Typography({
  className,
  size,
  color,
  children,
  weight,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
}) {
  return (
    <ScopeStyle
      $size={size}
      $colors={color}
      $weight={weight}
      $xs={xs}
      $sm={sm}
      $md={md}
      $lg={lg}
      $xl={xl}
      $xxl={xxl}
    >
      <span className={className}>{children}</span>
    </ScopeStyle>
  );
}
export default forwardRef(Typography);
