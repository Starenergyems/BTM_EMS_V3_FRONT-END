import TransparentCard from '@/components/units/transparentCard';
import Typography from '@/components/units/typography';
import { batteryConfig, unitName } from './indexConfig';

import { ScopeStyle } from './indexStyle';
import { color } from '@/styles/variable/indexStyle';

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
          <Typography className="battery-title" size="sm">
            契約容量現況
          </Typography>
          {Object.entries(batteryConfig).map(([key, value]) => (
            <div
              className="line-item"
              key={key}
              style={{ top: `${percentageHandler(data?.[key])}%` }}
            >
              <Typography className="item item-value" size="sm">
                {data?.[key]}
                {unitName}
              </Typography>
              <div className="line"></div>
              <Typography className="item item-label" size="sm">
                {value}
              </Typography>
            </div>
          ))}
          <div
            className="battery-container"
            style={{ height: `${100 - percentageHandler(data?.real) + 2}%` }}
          >
            <Typography
              className="battery-label"
              color={color.lightBlue}
              size="sm"
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
