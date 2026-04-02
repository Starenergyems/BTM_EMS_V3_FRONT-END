import { useEffect, useState, useTransition } from 'react';
import { Select, PageBox } from '@/components/units';
import AlarmTable from './alarmTable';
import { useHelpers } from './indexHelper';
import ScopeStyle from './indexStyle';
import { selectOptions } from './indexConfig';

function AlarmOverview({ title, titleEn, name }) {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState({
    data: [],
    filterDatas: [],
  });

  const { getDatas, handleSelectChange, handleTableChange } = useHelpers({
    name,
    state,
    setState,
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
            size="sm"
            placeholder="選擇能源類別"
            options={selectOptions}
            onChange={handleSelectChange}
          />
          <AlarmTable
            data={state?.filterDatas}
            name={name}
            isPending={isPending}
            onChange={handleTableChange}
          />
        </div>
      </ScopeStyle>
    </PageBox>
  );
}

export default AlarmOverview;
