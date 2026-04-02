import { pagesPathName } from '@/router';
import AlarmOverview from '@/components/page/alarmOverview';

function Historic() {
  const { routeName, pathName, pathNameEN } = pagesPathName.alarm.historic;

  return (
    <AlarmOverview title={pathName} titleEn={pathNameEN} name={routeName} />
  );
}

export default Historic;
