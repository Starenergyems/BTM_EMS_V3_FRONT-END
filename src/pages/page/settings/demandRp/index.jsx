import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { PageBox } from '@/components/units';
import Button from '@/components/units/button';
import { OuterFrame } from '@/components/units/outerFrame/index';
import {
  getDefaultValues,
  renderField,
} from '@/components/widgets/modalForm/indexHelper';
import { useBoolean } from '@/hooks/useBoolean';
import { pagesPathName } from '@/router';
import { Col, Form, Row } from 'antd';
import { useHelpers } from './indexHelper';
import { ModalOverview } from './modal/index';
import ScopeStyle from './indexStyle';

function DemandRp() {
  const routeName = pagesPathName.setting.demandRp.pathName;

  const location = useLocation();
  const navigate = useNavigate();
  const toggle = useBoolean(false);
  const [formInstance] = Form.useForm();
  const hasInitializedRef = useRef(false);

  // 選擇的策略
  const selectedStrategy =
    Form.useWatch('strategy', formInstance) || 'daily_pick_time';

  const { ExtraFormFields, formFields, getData, onSubmit } = useHelpers({
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
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    const nextPrefillEvent = location.state?.prefillEvent || {};

    const prefillValues = {
      ...nextPrefillEvent,
      range: [
        dayjs(nextPrefillEvent.sign_start_date),
        dayjs(nextPrefillEvent.sign_end_date),
      ],
      sign_end_date: dayjs(nextPrefillEvent.sign_end_date).format('YYYY-MM-DD'),
      sign_start_date: dayjs(nextPrefillEvent.sign_start_date).format(
        'YYYY-MM-DD',
      ),
    };

    // 先套用 prefill，避免首屏閃動與後續被 API 蓋掉
    if (Object.keys(nextPrefillEvent).length > 0) {
      formInstance.setFieldsValue(prefillValues);
    }

    getData(prefillValues);

    if (!nextPrefillEvent) return;

    navigate(location.pathname, { replace: true, state: null });
  }, [
    formInstance,
    getData,
    location.pathname,
    location.state,
    navigate,
    selectedStrategy,
  ]);

  const strategyName = ExtraFormFields?.[selectedStrategy]?.title;
  return (
    <PageBox headerTitle={`${routeName} Demand Response`}>
      <ScopeStyle>
        <Form
          form={formInstance}
          initialValues={getDefaultValues([...formFields()])}
        >
          <OuterFrame title={'基本設定'}>
            <div className="item">
              {formFields()?.map((item, idx) => (
                <Col
                  key={`form-item-${idx}`}
                  lg={{ span: idx === 0 ? 6 : 8 }}
                  span={24}
                >
                  <Form.Item {...item.formItemAttr}>
                    {renderField(item)}
                  </Form.Item>
                </Col>
              ))}
            </div>
          </OuterFrame>
          <OuterFrame title={strategyName || '需量類型'}>
            <Row justify="center">
              <Col span={8}>
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
              <Button onClick={() => onSubmit()} size="md" type="primary">
                送出
              </Button>
            </div>
          </OuterFrame>
        </Form>
        <ModalOverview toggle={toggle} />
      </ScopeStyle>
    </PageBox>
  );
}

export default DemandRp;
