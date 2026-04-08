import { useEffect, useState } from 'react';
import { useBoolean } from '@/hooks/useBoolean';
import { Table, Flex } from 'antd';
import Button from '@/components/units/button';
import { omRole } from '@/slices/api/main/accounts';
import { Select } from '@/components/units';
import { ModalOverview } from './modalOverview';

import { useHelpers } from './indexHelper';

function ManagementTable({ data, name, onChange }) {
  const toggle = useBoolean(false);

  const [state, setState] = useState({
    data: data,
    filteredDatas: data,
  });
  const [isEdit, setisEdit] = useState(false);

  const isPermissionManagement = name === 'permissionManagement';

  const { getColumnDatas, handleSelectChange } = useHelpers({
    state,
    setState,
    name,
    toggle,
    setisEdit,
  });

  const selectOptions = Object.keys(omRole).map((key) => ({
    label: omRole[key].key,
    value: omRole[key].key,
  }));
  selectOptions.unshift({ label: '全部', value: '' });

  return (
    <>
      {isPermissionManagement && (
        <Flex justify="space-between" align="center">
          <Select
            size="sm"
            placeholder="選擇角色名稱"
            options={selectOptions}
            onChange={handleSelectChange}
            className="mg-y-20"
          />
          <Button
            type="primary"
            onClick={() => {
              setisEdit(false);
              toggle.onTrue();
            }}
          >
            新增帳號
          </Button>
        </Flex>
      )}
      <Table
        columns={getColumnDatas()}
        dataSource={isPermissionManagement ? state.filteredDatas : data}
        loading={state.isLoading}
        pagination={{
          showTotal: (total) => `總共 ${Math.ceil(total / 10)} 頁`,
          pageSize: 10,
          position: ['bottomCenter'],
        }}
        rowClassName="custom-no-hover"
        rowKey="id"
        scroll={{
          x: 'max-content',
        }}
        onChange={onChange}
        style={{
          '--nodata-overflow': data?.length === 0 ? 'hidden' : 'auto hidden',
        }}
      />
      <ModalOverview toggle={toggle} isEdit={isEdit} />
    </>
  );
}

export default ManagementTable;
