import { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { PageBox } from '@/components/units';
import Typography from '@/components/units/typography';
import ManagementTable from './managementTable';
import { useHelpers } from './indexHelper';
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
      key: 'profile',
      label: '個人資料',
      children: (
        <ManagementTable
          name="profile"
          data={state?.user}
          setState={setState}
        />
      ),
    },
    {
      key: 'permissionManagement',
      label: '權限管理',
      children: (
        <ManagementTable
          name="permissionManagement"
          data={state?.accounts}
          setState={setState}
        />
      ),
    },
  ];

  return (
    <PageBox headerTitle={`${title} ${titleEn}`}>
      <ScopeStyle>
        <Tabs
          tabBarExtraContent={{
            left: (
              <Typography size="xl" className="mg-l-28 mg-r-50">
                系統設定
              </Typography>
            ),
          }}
          items={items}
        />
      </ScopeStyle>
    </PageBox>
  );
}

export default ManagementOverview;
