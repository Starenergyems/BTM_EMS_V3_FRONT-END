import { pagesPathName } from '@/router';
import { SystemOverview } from '@/components/page/systemOverview';

function Charger() {
  const { routeName, pathName, pathNameEN } = pagesPathName.charger;

  return (
    <SystemOverview title={pathName} titleEn={pathNameEN} name={routeName} />
  );
}

export default Charger;
