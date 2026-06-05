import { SystemOverview } from '@/components/page/systemOverview';
import { pagesPathName } from '@/router';

function Solar() {
  const { pathName, pathNameEN, routeName } = pagesPathName.solar;

  return (
    <SystemOverview name={routeName} title={pathName} titleEn={pathNameEN} />
  );
}

export default Solar;
