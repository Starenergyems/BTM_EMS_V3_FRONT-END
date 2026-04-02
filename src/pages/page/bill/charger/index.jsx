import { pagesPathName } from '@/router';
import { BillOverview } from '@/components/page/billOverview';

function charger() {
  const { routeName, pathName, pathNameEN } = pagesPathName.bill.charger;
  return (
    <BillOverview title={pathName} titleEn={pathNameEN} name={routeName} />
  );
}

export default charger;
