import { ImageUpload, Textarea } from '@/components/units';
import { TimePicker, Upload } from 'antd';
import { Icon } from '@iconify/react';
import { FormInput, FormSelect } from '@/components/units/form/index';
import DatePicker from '@/components/units/datePicker';
import { toUtcDateTime } from '@/utils/format';
import { color } from '@/styles/variable/indexStyle';

let hiddenRecord = {
  firstIsHiddenIndex: null,
  lastIsHiddenIndex: null,
  isHiddenCount: 0,
  record: {},
};

//決定要使用哪一個表單元件
function getFormUnit(item, formInstance, dateFields, isSubmitted) {
  switch (item.type) {
    //可客製化內容
    case 'custom': {
      return item.customProps?.children;
    }
    //還未做成自定義元件，仍完全使用ant-design，因此屬性傳遞會跟其他元件不一樣
    case 'datePicker': {
      dateFields.push(item.formItemAttr?.name);
      const datePickerProps = {
        ...item.datePickerProps,
        className: `${item.datePickerProps.className} w-100`,
        // datePickerAttr: {
        //   ...item?.datePickerProps?.datePickerAttr,
        //   name: item.formItemAttr.name, //使用Form.Item的name
        //   value:
        //     item?.datePickerProps?.datePickerAttr?.value ??
        //     item?.datePickerProps?.value,
        //   onChange: item?.datePickerProps?.datePickerAttr?.onChange,
        // },
        inputAttr: {
          ...item?.datePickerProps?.inputAttr,
          name: item.formItemAttr.name, //使用Form.Item的name
          value:
            item?.datePickerProps?.inputAttr?.value ??
            item?.datePickerProps?.value,
          onChange: item?.datePickerProps?.inputAttr?.onChange,
        },
      };
      return <DatePicker {...datePickerProps} />;
    }
    //還未做成自定義元件，仍完全使用ant-design，因此屬性傳遞會跟其他元件不一樣
    case 'dateRange': {
      const { RangePicker } = DatePicker;
      const datePickerProps = {
        ...item.datePickerProps,
      };
      return <RangePicker {...datePickerProps} />;
    }
    case 'input': {
      const inputProps = {
        ...item.inputProps,
        inputAttr: {
          ...item?.inputProps?.inputAttr,
          name: item.formItemAttr.name, //使用Form.Item的name
          value: item?.inputProps?.inputAttr?.value ?? item?.inputProps?.value,
          onChange: item?.inputProps?.inputAttr?.onChange,
        },
      };
      return <FormInput {...inputProps} />;
    }
    case 'imageUpload': {
      let imageProps = {
        ...item.imageProps,
        imageAttr: {
          ...item?.imageProps?.imageAttr,
          name: item.formItemAttr.name, //使用Form.Item的name
        },
      };
      if (!imageProps.type || imageProps.type === 'edit') {
        imageProps = {
          ...imageProps,
          uploadAttr: {
            ...item?.imageProps?.uploadAttr,
            name: item.formItemAttr.name, //使用Form.Item的name
            onChange(files) {
              formInstance.setFieldValue(item.formItemAttr.name, files);
              /*input file需要手動驗證欄位 */
              if (isSubmitted) {
                formInstance.validateFields([item.formItemAttr.name]);
                if (typeof imageProps?.onChange === 'function') {
                  imageProps.onChange();
                }
              }
            },
          },
        };
      }
      return <ImageUpload {...imageProps} />;
    }
    case 'select': {
      const selectProps = {
        ...item.selectProps,
        themecategory: 'circle-light',
        selectAttr: {
          ...item?.selectProps?.selectAttr,
          name: item.formItemAttr.name, //使用Form.Item的name
        },
        onChange:
          item?.selectProps?.onChange ||
          item?.selectProps?.selectAttr?.onChange,
      };
      return <FormSelect {...selectProps} />;
    }
    case 'textarea': {
      const inputProps = {
        ...item.inputProps,
        inputAttr: {
          ...item?.inputProps?.inputAttr,
          name: item.formItemAttr.name, //使用Form.Item的name
          value: item?.inputProps?.inputAttr?.value ?? item?.inputProps?.value,
          onChange: item?.inputProps?.inputAttr?.onChange,
        },
        inputTextAreaAttr: {
          ...item?.inputProps?.inputTextAreaAttr,
        },
      };
      return <Textarea {...inputProps} />;
    }
    //還未做成自定義元件，仍完全使用ant-design，因此屬性傳遞會跟其他元件不一樣
    case 'timePicker': {
      dateFields.push(item.formItemAttr?.name);
      const timePickerProps = {
        ...item.timePickerProps,
        className: `${item.timePickerProps.className} w-100`,
      };
      return <TimePicker {...timePickerProps} />;
    }
    case 'upload': {
      const uploadProps = {
        beforeUpload: () => false,
        fileList: item.uploadProp?.filedList || [],
        multiple: true,
        ...item.uploadProps,
      };
      return (
        <Upload listType="text" {...uploadProps}>
          {uploadProps.fileList?.length >= uploadProps.maxCount ? null : (
            <span className="btn-upload">
              <Icon
                color={color.white}
                icon="material-symbols:upload"
                fontSize={20}
              />
            </span>
          )}
        </Upload>
      );
    }
  }
}
//取得表單初始值
function getInitialValues(list) {
  const obj = {};
  for (const item of list) {
    let value, name;
    switch (item.type) {
      case 'datePicker':
        //沒有可以設定name的屬性，因此只能寫在form.Item上
        value = item?.formItemAttr?.value || item?.datePickerProps?.value;
        name = item?.formItemAttr?.name;
        break;
      case 'dateRange':
        //沒有可以設定name的屬性，因此只能寫在form.Item上
        value = item?.formItemAttr?.value || item?.datePickerProps?.value;
        name = item?.formItemAttr?.name;
        break;
      case 'input': {
        value = item?.formItemAttr?.value || item?.inputProps?.inputAttr?.value;
        name = item?.formItemAttr?.name || item?.inputProps?.inputAttr?.name;
        break;
      }
      //沒有可以設定name的屬性，因此只能寫在form.Item上
      case 'imageUpload': {
        value = item?.formItemAttr?.value;
        name = item?.formItemAttr?.name;
        break;
      }
      case 'select': {
        value =
          item?.formItemAttr?.value || item?.selectProps?.selectAttr?.value;
        name = item?.formItemAttr?.name || item?.selectProps?.selectAttr?.name;
        break;
      }
      case 'textarea': {
        value =
          item?.formItemAttr?.value || item?.textAreaProps?.textareaAttr?.value;
        name =
          item?.formItemAttr?.name || item?.textAreaProps?.textareaAttr?.name;
        break;
      }
      case 'upload': {
        value = item?.formItemAttr?.value || item?.uploadProps?.value;
        name = item?.formItemAttr?.name || item?.uploadProps?.name;
        break;
      }
    }
    if (value != null) {
      obj[name] = value;
    }
  }
  return obj;
}
//送出表單
function onSubmit(form, onFail, onSuccess, setIsSubmitted, dateFields) {
  setIsSubmitted(true);
  form
    .validateFields()
    .then((values) => {
      if (typeof onSuccess === 'function') {
        values = getFormatDateValue(values, dateFields);

        onSuccess(values, form);
      }
    })
    .catch((errorInfo) => {
      const { errorFields } = errorInfo;
      form.scrollToField(errorFields[0].name[0], {
        block: 'center',
        behavior: 'smooth',
      });
      if (typeof onFail === 'function') {
        onFail(errorInfo);
      }
    });
}

//表單reset
function onReset(formInstance, setIsSubmitted) {
  formInstance.resetFields();
  setIsSubmitted(false);
}
//處理日期元件的值(因Datepicker元件需要dayjs的格式value，但前後端資料面需要iso8601格式)
function getFormatDateValue(values, dateFields) {
  const dateFielsList = [...new Set(dateFields)].filter(
    (item) => item !== undefined,
  );
  if (dateFielsList.length > 0) {
    for (const name of dateFielsList) {
      values[name] = toUtcDateTime(values[name]);
    }
  }
  return values;
}
//處理list中的各個item的offset
function getOffset({
  isFullWidth,
  index,
  isHaveGroupTitle,
  item,
  list,
  referenceIndexRef,
}) {
  let offset = 0;
  const prevItemIsFullWidth =
    list[index - 1] &&
    (list[index - 1].type === 'textarea' ||
      list[index - 1].type === 'custom' ||
      list[index - 1].isFullWidth);

  if (prevItemIsFullWidth || isHaveGroupTitle) {
    referenceIndexRef.current = index - 1;
  }
  hiddenRecord[index] = item.isHidden === true;
  //第一筆做初始化
  if (index === 0) {
    hiddenRecord = {
      firstIsHiddenIndex: null,
      lastIsHiddenIndex: null,
      isHiddenCount: 0,
      record: {},
    };
  } else {
    if (!hiddenRecord.record[index]) {
      if (item.isHidden === true) {
        hiddenRecord.lastIsHiddenIndex = index;
        hiddenRecord.isHiddenCount += 1;
        hiddenRecord.record[index] = { index, item };
        if (hiddenRecord.firstIsHiddenIndex === null) {
          hiddenRecord.firstIsHiddenIndex = index;
        }
      }
    }
  }
  //具有滿版的項目
  if (isFullWidth) {
    offset = 2;
  }
  //上一個index為滿版，當前的index
  else if (prevItemIsFullWidth) {
    offset = 2;
  }
  //具有group title的項目
  else if (isHaveGroupTitle) {
    offset = 2;
  }
  //當前的index，之前的筆數有出現滿版的項目或者group title
  else if (
    referenceIndexRef.current !== null &&
    index > referenceIndexRef.current
  ) {
    //有滿版項目出現後的單數index
    if ((index - referenceIndexRef.current) % 2) {
      offset = 2;
    }
    //有滿版項目出現後的偶數index
    else {
      offset = 0;
    }
  } else {
    //單數行的項目
    if ((index + 1) % 2) {
      offset = 2;
    } else {
      offset = 0;
    }
    //當前的index前，有項目有isHidden:true
    if (
      hiddenRecord.firstIsHiddenIndex &&
      index > hiddenRecord.firstIsHiddenIndex
    ) {
      //單數行的項目
      if ((index - hiddenRecord.isHiddenCount + 1) % 2) {
        offset = 2;
      } else {
        offset = 0;
      }
    }
  }
  return offset;
}

export { getFormUnit, getOffset, getInitialValues, onReset, onSubmit };
