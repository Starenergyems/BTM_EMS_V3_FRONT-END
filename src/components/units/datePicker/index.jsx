import { forwardRef } from 'react';
import dayjs from 'dayjs';
import { DatePicker as AntdDatePicker } from 'antd';
import ScopeStyle from '@/components/units/datePicker/indexStyle';

function DatePicker(
  {
    bgColor,
    className,
    defaultValue,
    errorMessage,
    // datePickerAttr = {},
    inputAttr = {},
    isInvalid,
    size,
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
      $bgColor={bgColor}
      $isInvalid={isInvalid}
      $size={size}
      $status={inputAttr?.status}
      className={` ${className ?? ''}`}
    >
      <AntdDatePicker autoComplete="off" {...datePickerProps} ref={ref} />
      {(isInvalid || inputAttr?.status === 'error') && (
        <div className="ant-form-item-explain-error">*{errorMessage}</div>
      )}
    </ScopeStyle>
  );
}
export default forwardRef(DatePicker);
