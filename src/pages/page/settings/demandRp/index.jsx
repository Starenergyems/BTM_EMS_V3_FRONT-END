import { useEffect } from 'react';
import { pagesPathName } from '@/router';
import { useBoolean } from '@/hooks/useBoolean';
import { color } from '@/styles/variable/indexStyle';
import { Form, Row, Col } from 'antd';
import { PageBox } from '@/components/units';
import { OuterFrame } from '@/components/units/outerFrame/index';
import {
  renderField,
  getDefaultValues,
} from '@/components/widgets/modalForm/indexHelper';
import ScopeStyle from './indexStyle';
import { useHelpers } from './indexHelper';
import Typography from '@/components/units/typography';
import Button from '@/components/units/button';
import { ModalOverview } from './modal/index';

function DemandRp() {
  const routeName = pagesPathName.setting.demandRp.pathName;

  const toggle = useBoolean(false);
  const [formInstance] = Form.useForm();

  // 選擇的策略
  const selectedStrategy =
    Form.useWatch('strategy', formInstance) || 'daily_pick_time';

  const { getData, formFields, ExtraFormFields, onSubmit } = useHelpers({
    formInstance,
    selectedStrategy,
    toggle,
  });

  useEffect(() => {
    const strategyFields =
      ExtraFormFields?.[selectedStrategy]?.formEields || [];
    formInstance.setFieldsValue(getDefaultValues(strategyFields));
  }, [selectedStrategy, formInstance]);

  useEffect(() => {
    if (selectedStrategy) {
      getData();
    }
  }, [selectedStrategy]);

  return (
    <PageBox headerTitle={`${routeName} VPP Demand Response`}>
      <ScopeStyle>
        <Form
          form={formInstance}
          initialValues={getDefaultValues([...formFields()])}
        >
          <OuterFrame title={'基本設定'}>
            <div className="item">
              {formFields()?.map((item, idx) => (
                <Col
                  lg={{ span: idx === 0 ? 6 : 8 }}
                  span={24}
                  key={`form-item-${idx}`}
                >
                  <Form.Item {...item.formItemAttr}>
                    {renderField(item)}
                  </Form.Item>
                </Col>
              ))}
            </div>
          </OuterFrame>
          <OuterFrame title={'需量類型'}>
            <Row className="item">
              <Col lg={{ span: 6 }} span={24} className="mg-y-20">
                <Typography
                  md={{ size: 'sm' }}
                  size="md"
                  color={color.themeBlack}
                >
                  {ExtraFormFields?.[selectedStrategy]?.title}
                </Typography>
              </Col>
              <Col lg={{ span: 8 }} span={24}>
                {ExtraFormFields?.[selectedStrategy]?.formEields?.map(
                  (item, idx) => (
                    <Form.Item
                      key={`${selectedStrategy}-form-item-${idx}`}
                      {...item.formItemAttr}
                    >
                      {renderField(item)}
                    </Form.Item>
                  ),
                )}
              </Col>
            </Row>
            <div className="center-btn">
              <Button size="md" type="primary" onClick={() => onSubmit()}>
                送出
              </Button>
            </div>
          </OuterFrame>
        </Form>
        <ModalOverview toggle={toggle}  />
      </ScopeStyle>
    </PageBox>
  );
}

export default DemandRp;
