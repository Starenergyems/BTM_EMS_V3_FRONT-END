import { SystemOverview } from '@/components/page/systemOverview';
import { pagesPathName } from '@/router';

function storage() {
  const { pathName, pathNameEN, routeName } = pagesPathName.storage;

  return (
    <SystemOverview name={routeName} title={pathName} titleEn={pathNameEN} />
  );
}

export default storage;
