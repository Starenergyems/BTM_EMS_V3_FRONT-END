import { SystemOverview } from '@/components/page/systemOverview';
import { pagesPathName } from '@/router';

function Charger() {
  const { pathName, pathNameEN, routeName } = pagesPathName.charger;

  return (
    <SystemOverview name={routeName} title={pathName} titleEn={pathNameEN} />
  );
}

export default Charger;
