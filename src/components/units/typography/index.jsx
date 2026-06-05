import { forwardRef } from 'react';

import ScopeStyle from './indexStyle';

function Typography({
  children,
  className,
  color,
  lg,
  md,
  size,
  sm,
  weight,
  xl,
  xs,
  xxl,
}) {
  return (
    <ScopeStyle
      $colors={color}
      $lg={lg}
      $md={md}
      $size={size}
      $sm={sm}
      $weight={weight}
      $xl={xl}
      $xs={xs}
      $xxl={xxl}
    >
      <span className={className}>{children}</span>
    </ScopeStyle>
  );
}
export default forwardRef(Typography);
