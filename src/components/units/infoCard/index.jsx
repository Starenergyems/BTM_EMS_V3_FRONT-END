import Typography from '@/components/units/typography';
import ScopeStyle from './indexStyle';
import tree from '@/assets/img/component/tree.png';
import charger from '@/assets/img/component/charger.png';

export const InfoCard = ({ title, value, color, icon }) => {
  return (
    <ScopeStyle>
      <div className={icon ? 'flex' : ''}>
        <div>
          <Typography size="lg">{title}</Typography>
          <div className={!icon ? 'card-value' : 'card-with-icon'}>
            <Typography size="xxl" weight="600" color={color}>
              {value ?? '0'}
            </Typography>
          </div>
        </div>
        {icon === 'solar' ? (
          <img src={tree} alt="logo" className="logo" />
        ) : icon === 'charger' ? (
          <img src={charger} alt="logo" className="logo" />
        ) : (
          ''
        )}
      </div>
    </ScopeStyle>
  );
};
