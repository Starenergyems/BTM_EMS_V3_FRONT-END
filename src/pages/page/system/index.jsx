import ManagementOverview from '@/components/page/managementOverview';
import { pagesPathName } from '@/router/pagesPathName';

function System() {
  const { pathName, pathNameEN, routeName } =
    pagesPathName.systemSetting.system;

  return (
    <ManagementOverview
      name={routeName}
      title={pathName}
      titleEn={pathNameEN}
    />
  );
}

export default System;
