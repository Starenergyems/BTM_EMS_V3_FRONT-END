import { color } from '@/styles/variable/indexStyle';
import Typography from '@/components/units/typography';
import TransparentCard from '@/components/units/transparentCard';

import { batteryConfig, unitName } from './indexConfig';
import { ScopeStyle } from './indexStyle';

export const Battery = ({ data }) => {
  const percentageHandler = (value) => {
    const average = Math.round((value / data?.contract) * 100);
    const percentage = 100 - average;

    if (percentage > 30) {
      return percentage - 2;
    } else {
      return percentage + 12;
    }
  };

  return (
    <ScopeStyle>
      <TransparentCard>
        <div className="battery-content">
          <Typography size="sm" className="battery-title">
            契約容量現況
          </Typography>
          {Object.entries(batteryConfig).map(([key, value]) => (
            <div
              className="line-item"
              key={key}
              style={{ top: `${percentageHandler(data?.[key])}%` }}
            >
              <Typography size="sm" className="item item-value">
                {data?.[key]}
                {unitName}
              </Typography>
              <div className="line"></div>
              <Typography size="sm" className="item item-label">
                {value}
              </Typography>
            </div>
          ))}
          <div
            className="battery-container"
            style={{ height: `${100 - percentageHandler(data?.real) + 2}%` }}
          >
            <Typography
              size="sm"
              color={color.lightBlue}
              className="battery-label"
            >
              {data?.real}
              {unitName}
            </Typography>
            <div className="battery-value"></div>
          </div>
        </div>
      </TransparentCard>
    </ScopeStyle>
  );
};
