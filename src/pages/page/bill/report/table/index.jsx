import { Table } from 'antd';

import { useHelpers } from './indexHelper';

export function ReportTable({ data = [], date, type, isPending, onChange }) {
  const { getColumnDatas } = useHelpers({
    date,
    type,
  });

  return (
    <Table
      columns={getColumnDatas()}
      dataSource={data}
      loading={isPending}
      pagination={{
        pageSize: 50,
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
