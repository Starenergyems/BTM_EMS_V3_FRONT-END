import { SystemOverview } from '@/components/page/systemOverview';
import { pagesPathName } from '@/router';

function storage() {
  const { pathName, pathNameEN, routeName } = pagesPathName.storage;
console.log('pathName', pathName, pathNameEN, routeName);
  return (
    // <div>123</div>
    <SystemOverview name={routeName} title={pathName} titleEn={pathNameEN} />
  );
}

export default storage;
