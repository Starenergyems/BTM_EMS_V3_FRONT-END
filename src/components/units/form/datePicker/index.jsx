import { forwardRef } from 'react';
import DatePicker from '@/components/units/datePicker';
import ScopeStyle from './indexStyle';

function FormDatePicker({ ...props }) {
  return (
    <ScopeStyle $frame={'frame'}>
      <DatePicker {...props} />
    </ScopeStyle>
  );
}

export default forwardRef(FormDatePicker);
