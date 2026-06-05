import { Fragment, useEffect, useRef, useState } from 'react';
import Button from '@/components/units/button';
import Typography from '@/components/units/typography';
import { Col, Flex, Form, Row, Spin } from 'antd';
import { renderField } from './indexHelper';
import {
  getFormUnit,
  getInitialValues,
  onReset,
  onSubmit,
} from './indexHelper1';
import ScopeStyle from './indexStyle';
import { color } from '@/styles/variable/indexStyle';

/* 注意事項：
  1.onSuccess為表單驗證(modalForm元件內的驗證)，成功後要執行的function
    若外部prop帶入onOk，會將表單驗證的function完全覆蓋
  2.欄位onChange事件請加在list的props層(selectProps,inputProps,datePickerProps...)而不要加在attr層(selectProps.selectAttr，inputProps.inputAttr,...) 
  3.name、value請加在formItemAttr層
*/
function ModalForm({
  formAttr,
  groupTitleSetting = [] /*
    groupTitleSetting:[[要出現標題的list index,標題內容]] 例如[[2, "甲方"],[6, "乙方"]]
  */,
  isLoading,
  isUpload /*
    list:{
      id,isHidden,isFullWidth,formItemAttr,type,selectProps,inputProps,datePickerProps
    }
  */,
  list,
  modalAttr,
  onFail,
  onFormReady,
  onSuccess,
  styles,
}) {
  const [formInstance] = Form.useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dateFieldsRef = useRef([]); //紀錄date欄位，要統一處理日期

  //將form的instance綁定給元件外部使用
  useEffect(() => {
    if (typeof onFormReady === 'function') {
      onFormReady(formInstance, isSubmitted);
    }
  }, [formInstance, isSubmitted, onFormReady]);

  // 動態更新表單值
  useEffect(() => {
    if (Array.isArray(list)) {
      const updatedValues = getInitialValues(list);

      if (Object.keys(updatedValues).length > 0) {
        formInstance.setFieldsValue(updatedValues);
      }
    }
  }, [list, formInstance]);

  return (
    <ScopeStyle
      $customStyle={styles}
      afterClose={() => onReset(formInstance, setIsSubmitted)}
      closeIcon={false}
      forceRender
      {...modalAttr}
      footer={[
        <Flex gutter={[16, 0]} justify="center" key="modal-footer">
          <Button
            className="btn-cancel"
            onClick={modalAttr?.onCancel}
            size="md"
            variant="default"
          >
            <Typography size="lg">{modalAttr?.cancelText}</Typography>
          </Button>
          <Button
            className="btn-submit"
            onClick={() =>
              onSubmit(
                formInstance,
                onFail,
                onSuccess,
                setIsSubmitted,
                dateFieldsRef.current,
              )
            }
            size="md"
            type="primary"
          >
            <Typography size="lg">{modalAttr?.okText}</Typography>
          </Button>
        </Flex>,
      ]}
      style={{
        maxWidth: '805px',
        minWidth: '350px',
      }}
      styles={{
        footer: {
          direction: 'rtl',
          textAlign: 'center',
        },
        header: { textAlign: 'center' },
        ...modalAttr?.styles,
      }}
      title={
        <Typography color={color.black} size="lg">
          {modalAttr?.title}
        </Typography>
      }
      width="70vw"
    >
      {isLoading ? (
        <Spin />
      ) : (
        <div className="form-box">
          {Array.isArray(list) && (
            <Form
              form={formInstance}
              // initialValues={getInitialValues(list)}
              layout="vertical"
              // validateTrigger={isSubmitted ? 'onChange' : 'onSubmit'}
              {...formAttr}
            >
              {/* 為了讓每次開啟Modal時，scrollbar都在最上方 */}
              {modalAttr?.open && (
                <Row className="inner-wrap" gutter={[64, 0]}>
                  {list.map((item, index) => {
                    const isTextarea = item.type === 'textarea';

                    const isCustom = item.type === 'custom';

                    // const isHaveGroupTitle = groupTitleSetting?.some(
                    //   (item) => (Upload = item.type === 'upload'),
                    // );
                    const isFullWidth =
                      isTextarea || isCustom || item.isFullWidth;

                    // const groupTitleData = groupTitleSetting?.find(
                    //   (setting) => setting[0] === index,
                    // );

                    const extraProps = isUpload
                      ? {
                          getValueFromEvent: (e) => e?.fileList,
                          valuePropName: 'fileList',
                        }
                      : {};

                    return (
                      <Col
                        className={item.isHidden ? 'custom-d-none' : ''}
                        key={item.id || index}
                        lg={isFullWidth ? 24 : 12}
                        xs={24}
                      >
                        <Form.Item {...item.formItemAttr} {...extraProps}>
                          {renderField(item)}
                        </Form.Item>
                      </Col>
                    );
                  })}
                </Row>
              )}
            </Form>
          )}
        </div>
      )}
    </ScopeStyle>
  );
}

export default ModalForm;
