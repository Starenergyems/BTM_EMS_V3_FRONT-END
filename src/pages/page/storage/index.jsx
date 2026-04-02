import { pagesPathName } from '@/router';
import { SystemOverview } from '@/components/page/systemOverview';

function storage() {
  const { routeName, pathName, pathNameEN } = pagesPathName.storage;

  return (
    <SystemOverview title={pathName} titleEn={pathNameEN} name={routeName} />
  );
}

export default storage;
