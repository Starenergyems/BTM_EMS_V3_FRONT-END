import AlarmOverview from '@/components/page/alarmOverview';
import { pagesPathName } from '@/router';

function Real() {
  const { pathName, pathNameEN, routeName } = pagesPathName.alarm.real;

  return (
    <AlarmOverview name={routeName} title={pathName} titleEn={pathNameEN} />
  );
}

export default Real;
