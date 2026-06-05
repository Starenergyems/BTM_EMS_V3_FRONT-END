import { useEffect, useState } from 'react';
import { PageBox } from '@/components/units';
import Typography from '@/components/units/typography';
import { Tabs } from 'antd';
import { useHelpers } from './indexHelper';
import ManagementTable from './managementTable';
import ScopeStyle from './indexStyle';

function ManagementOverview({ title, titleEn }) {
  const [state, setState] = useState(null);

  const { getDatas } = useHelpers({
    setState,
  });

  useEffect(() => {
    getDatas();
  }, []);

  const items = [
    {
      children: (
        <ManagementTable
          data={state?.user}
          name="profile"
          setState={setState}
        />
      ),
      key: 'profile',
      label: '個人資料',
    },
    {
      children: (
        <ManagementTable
          data={state?.accounts}
          name="permissionManagement"
          setState={setState}
        />
      ),
      key: 'permissionManagement',
      label: '權限管理',
    },
  ];

  return (
    <PageBox headerTitle={`${title} ${titleEn}`}>
      <ScopeStyle>
        <Tabs
          items={items}
          tabBarExtraContent={{
            left: (
              <Typography className="mg-l-28 mg-r-50" size="xl">
                系統設定
              </Typography>
            ),
          }}
        />
      </ScopeStyle>
    </PageBox>
  );
}

export default ManagementOverview;
