import { pagesPathName } from '@/router';
import { BillOverview } from '@/components/page/billOverview';

function storage() {
  const { routeName, pathName, pathNameEN } = pagesPathName.bill.storage;

  return (
    <BillOverview title={pathName} titleEn={pathNameEN} name={routeName} />
  );
}

export default storage;
