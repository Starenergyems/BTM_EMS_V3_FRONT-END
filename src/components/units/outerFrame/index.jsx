import { color } from '@/styles/variable/indexStyle';

import Typography from '@/components/units/typography';
import { ScopeStyle } from './indexStyle';

export const OuterFrame = ({ title, icon, children }) => {
  return (
    <ScopeStyle>
      <div className="form-header">
        <Typography size="lg" color={color.themeBlack}>
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
