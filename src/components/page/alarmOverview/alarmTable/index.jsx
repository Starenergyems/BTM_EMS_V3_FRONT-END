import { Table } from 'antd';

import { useHelpers } from './indexHelper';

function AlarmTable({ data = [], name, isPending, onChange }) {
  const { getColumnDatas } = useHelpers({
    name,
  });

  return (
    <Table
      columns={getColumnDatas()}
      dataSource={data}
      loading={isPending}
      pagination={{
        showTotal: (total) => `總共 ${Math.ceil(total / 10)} 頁`,
        pageSize: 10,
        position: ['bottomCenter'],
      }}
      rowClassName="custom-no-hover"
      rowKey={
        (record) =>
          `${record.id || ''}-${record.time || ''}-${record.type || ''}-${Math.random()}` // 確保每行有唯一的 key
      }
      scroll={{
        x: 'max-content',
      }}
      onChange={onChange}
      style={{
        '--nodata-overflow': data.length === 0 ? 'hidden' : 'auto hidden',
      }}
    />
  );
}

export default AlarmTable;
