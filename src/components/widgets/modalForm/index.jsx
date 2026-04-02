import { Fragment, useEffect, useRef, useState } from 'react';
import { color } from '@/styles/variable/indexStyle';
import { Col, Form, Row, Spin, Flex } from 'antd';
import Button from '@/components/units/button';
import {
  getFormUnit,
  getInitialValues,
  onReset,
  onSubmit,
} from './indexHelper1';
import { renderField } from './indexHelper';
import ScopeStyle from './indexStyle';
import Typography from '@/components/units/typography';

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
  list /*
    list:{
      id,isHidden,isFullWidth,formItemAttr,type,selectProps,inputProps,datePickerProps
    }
  */,
  isUpload,
  modalAttr,
  onFormReady,
  onFail,
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
      title={
        <Typography size="lg" color={color.black}>
          {modalAttr?.title}
        </Typography>
      }
      footer={[
        <Flex key="modal-footer" justify="center" gutter={[16, 0]}>
          <Button
            size="md"
            className="btn-cancel"
            onClick={modalAttr?.onCancel}
          >
            <Typography size="lg">{modalAttr?.cancelText}</Typography>
          </Button>
          <Button
            type="primary"
            size="md"
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
          >
            <Typography size="lg">{modalAttr?.okText}</Typography>
          </Button>
        </Flex>,
      ]}
      width="70vw"
      style={{
        maxWidth: '805px',
        minWidth: '350px',
      }}
      styles={{
        header: { textAlign: 'center' },
        footer: {
          textAlign: 'center',
          direction: 'rtl',
        },
        ...modalAttr?.styles,
      }}
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
                <Row gutter={[64, 0]} className="inner-wrap">
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
                          valuePropName: 'fileList',
                          getValueFromEvent: (e) => e?.fileList,
                        }
                      : {};

                    return (
                      <Col
                        key={item.id || index}
                        className={item.isHidden ? 'custom-d-none' : ''}
                        xs={24}
                        lg={isFullWidth ? 24 : 12}
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
