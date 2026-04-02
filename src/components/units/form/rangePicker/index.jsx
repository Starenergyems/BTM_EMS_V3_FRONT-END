import { forwardRef } from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
import ScopeStyle from './indexStyle';

const { RangePicker } = AntdDatePicker;

function FormRangePicker({ ...props }) {
  return (
    <ScopeStyle $frame={'frame'}>
      <RangePicker {...props} />
    </ScopeStyle>
  );
}

export default forwardRef(FormRangePicker);
