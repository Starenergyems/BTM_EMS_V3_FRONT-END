import { pagesPathName } from '@/router/pagesPathName';
import ManagementOverview from '@/components/page/managementOverview';

function System() {
  const { routeName, pathName, pathNameEN } =
    pagesPathName.systemSetting.system;

  return (
    <ManagementOverview
      title={pathName}
      titleEn={pathNameEN}
      name={routeName}
    />
  );
}

export default System;
