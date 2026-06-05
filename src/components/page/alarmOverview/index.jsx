import { useEffect, useState, useTransition } from 'react';
import { PageBox, Select } from '@/components/units';
import AlarmTable from './alarmTable';
import { selectOptions } from './indexConfig';
import { useHelpers } from './indexHelper';
import ScopeStyle from './indexStyle';

function AlarmOverview({ name, title, titleEn }) {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState({
    data: [],
    filterDatas: [],
  });

  const { getDatas, handleSelectChange, handleTableChange } = useHelpers({
    name,
    setState,
    state,
  });

  useEffect(() => {
    startTransition(async () => {
      await getDatas();
    });
  }, []);

  return (
    <PageBox headerTitle={`${title}總覽 ${titleEn}`}>
      <ScopeStyle>
        <div className="alarm-overview-container">
          <Select
            onChange={handleSelectChange}
            options={selectOptions}
            placeholder="選擇能源類別"
            size="sm"
          />
          <AlarmTable
            data={state?.filterDatas}
            isPending={isPending}
            name={name}
            onChange={handleTableChange}
          />
        </div>
      </ScopeStyle>
    </PageBox>
  );
}

export default AlarmOverview;
