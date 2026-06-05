import { BillOverview } from '@/components/page/billOverview';
import { pagesPathName } from '@/router';

function solar() {
  const { pathName, pathNameEN, routeName } = pagesPathName.bill.solar;
  const name = routeName.split('bill')[1]?.toLocaleLowerCase() || '';
  return <BillOverview name={name} title={pathName} titleEn={pathNameEN} />;
}

export default solar;
