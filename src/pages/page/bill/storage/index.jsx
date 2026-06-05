import { BillOverview } from '@/components/page/billOverview';
import { pagesPathName } from '@/router';

function storage() {
  const { pathName, pathNameEN, routeName } = pagesPathName.bill.storage;
  const name = routeName.split('bill')[1]?.toLocaleLowerCase() || '';
  return <BillOverview name={name} title={pathName} titleEn={pathNameEN} />;
}

export default storage;
