import { pagesPathName } from '@/router';
import AlarmOverview from '@/components/page/alarmOverview';

function Real() {
  const { routeName, pathName, pathNameEN } = pagesPathName.alarm.real;

  return (
    <AlarmOverview title={pathName} titleEn={pathNameEN} name={routeName} />
  );
}

export default Real;
