import AlarmOverview from '@/components/page/alarmOverview';
import { pagesPathName } from '@/router';

function Historic() {
  const { pathName, pathNameEN, routeName } = pagesPathName.alarm.historic;

  return (
    <AlarmOverview name={routeName} title={pathName} titleEn={pathNameEN} />
  );
}

export default Historic;
