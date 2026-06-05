import {
  FormDatePicker,
  FormInput,
  FormRangePicker,
  FormSelect,
  FormSwitch,
  FormTimePicker,
  FormTimeRangePicker,
} from '@/components/units/form';
import { inputNumHandler } from '@/utils/helpers';

// 1. 定義元件映射表 (將邏輯抽離)
const FORM_COMPONENTS = {
  datepicker: (props) => <FormDatePicker {...props} />,
  input: (props) => <FormInput {...props} />,
  rangePicker: (props) => <FormRangePicker {...props} />,
  select: (props) => <FormSelect {...props} />,
  switch: (props) => <FormSwitch {...props} />,
  timepicker: (props) => <FormTimePicker {...props} />,
  timerangepicker: (props) => <FormTimeRangePicker {...props} />,
  // 如果有複雜邏輯，可以寫成 builder 函數
  // textarea: (props) => <Textarea {...props} />,
};

// 2. 統一的 Props 處理器 (解決你方法一中繁瑣的屬性傳遞)
const getPropsByType = (item) => {
  const baseProps = {
    ...item.componentProps,
  };

  const commonProps = {
    ...baseProps,
    ...item.formItemAttr,
    name: item.formItemAttr.name,
    onInput: (e) => {
      /* 統一事件處理 */
      item?.formItemAttr?.inputPattern === 'number' && inputNumHandler(e);
    },
  };

  // 這裡統一處理 name, value, onChange 等共用邏輯
  return {
    ...commonProps,
    inputAttr: commonProps.inputAttr,

    // onChange: (e) => {
    //   /* 統一事件處理 */
    // },
    // ... 其他客製化邏輯
  };
};

// 3. 在主程式渲染
export const renderField = (item) => {
  const Component = FORM_COMPONENTS[item.variants];
  if (!Component) return null;

  const props = getPropsByType(item);
  return <Component {...props} />;
};

// 取得表單初始值
export const getDefaultValues = (fields) => {
  return fields.reduce((result, item) => {
    const name = item?.formItemAttr?.name;
    if (!name) return result;

    const defaultValue = item?.formItemAttr?.defaultValue;

    if (defaultValue !== undefined) {
      result[name] = defaultValue;
    }

    return result;
  }, {});
};
