import { forwardRef } from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
import dayjs from 'dayjs';
import ScopeStyle from '@/components/units/datePicker/indexStyle';

function DatePicker(
  {
    defaultValue,
    className,
    size,
    bgColor,
    errorMessage,
    // datePickerAttr = {},
    inputAttr = {},
    isInvalid,
    ...forwardRefProps
  },
  ref,
) {
  const datePickerProps = { ...inputAttr, ...forwardRefProps };
  datePickerProps.value = inputAttr.value ?? forwardRefProps.value;

  // 轉換 defaultValue 為 dayjs 物件
  const defaultVal = inputAttr.defaultValue ?? defaultValue;
  datePickerProps.defaultValue = defaultVal
    ? dayjs.isDayjs(defaultVal)
      ? defaultVal
      : dayjs(defaultVal)
    : undefined;

  return (
    <ScopeStyle
      className={` ${className ?? ''}`}
      $status={inputAttr?.status}
      $isInvalid={isInvalid}
      $size={size}
      $bgColor={bgColor}
    >
      <AntdDatePicker autoComplete="off" {...datePickerProps} ref={ref} />
      {(isInvalid || inputAttr?.status === 'error') && (
        <div className="ant-form-item-explain-error">*{errorMessage}</div>
      )}
    </ScopeStyle>
  );
}
export default forwardRef(DatePicker);
