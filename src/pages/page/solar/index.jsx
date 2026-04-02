import { pagesPathName } from '@/router';
import { SystemOverview } from '@/components/page/systemOverview';

function Solar() {
  const { routeName, pathName, pathNameEN } = pagesPathName.solar;

  return (
    <SystemOverview title={pathName} titleEn={pathNameEN} name={routeName} />
  );
}

export default Solar;
