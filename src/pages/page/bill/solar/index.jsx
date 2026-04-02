import { pagesPathName } from '@/router';
import { BillOverview } from '@/components/page/billOverview';

function solar() {
  const { routeName, pathName, pathNameEN } = pagesPathName.bill.solar;

  return (
    <BillOverview title={pathName} titleEn={pathNameEN} name={routeName} />
  );
}

export default solar;
