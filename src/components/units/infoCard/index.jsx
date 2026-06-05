import charger from '@/assets/img/component/charger.png';
import tree from '@/assets/img/component/tree.png';
import Typography from '@/components/units/typography';
import ScopeStyle from './indexStyle';

export const InfoCard = ({ color, icon, title, value }) => {
  return (
    <ScopeStyle>
      <div className={icon ? 'flex' : ''}>
        <div>
          <Typography size="lg">{title}</Typography>
          <div className={!icon ? 'card-value' : 'card-with-icon'}>
            <Typography color={color} size="xxl" weight="600">
              {value ?? '0'}
            </Typography>
          </div>
        </div>
        {icon === 'solar' ? (
          <img alt="logo" className="logo" src={tree} />
        ) : icon === 'charger' ? (
          <img alt="logo" className="logo" src={charger} />
        ) : (
          ''
        )}
      </div>
    </ScopeStyle>
  );
};
