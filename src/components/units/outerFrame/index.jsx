import Typography from '@/components/units/typography';

import { ScopeStyle } from './indexStyle';
import { color } from '@/styles/variable/indexStyle';

export const OuterFrame = ({ children, icon, title }) => {
  return (
    <ScopeStyle>
      <div className="form-header">
        <Typography color={color.themeBlack} size="lg">
          {title}
        </Typography>
        {icon && icon}
      </div>
      <div className="form-frame">
        <div className="form-content">{children}</div>
      </div>
    </ScopeStyle>
  );
};
