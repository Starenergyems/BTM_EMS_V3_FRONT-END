import { BillOverview } from '@/components/page/billOverview';
import { pagesPathName } from '@/router';

function charger() {
  const { pathName, pathNameEN, routeName } = pagesPathName.bill.charger;

  const name = routeName.split('bill')[1]?.toLocaleLowerCase() || '';

  return <BillOverview name={name} title={pathName} titleEn={pathNameEN} />;
}

export default charger;
