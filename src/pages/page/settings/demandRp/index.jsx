import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { PageBox } from '@/components/units';
import { Typography } from '@/components/units';
import Button from '@/components/units/button';
import { OuterFrame } from '@/components/units/outerFrame/index';
import {
  getDefaultValues,
  renderField,
} from '@/components/widgets/modalForm/indexHelper';
import { useBoolean } from '@/hooks/useBoolean';
import { pagesPathName } from '@/router';
import { Col, Form, Row } from 'antd';
import { useFields } from './indexConfig';
import { useHelpers } from './indexHelper';
import { ModalOverview } from './modal/index';

import ScopeStyle from './indexStyle';
import { color } from '@/styles/variable/indexStyle';

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

  const { getData, onSubmit } = useHelpers({
    formInstance,
    selectedStrategy,
    toggle,
  });

  const { DemandRpFormFields, FormFields } = useFields({
    formInstance,
    selectedStrategy,
  });

  useEffect(() => {
    const strategyFields =
      DemandRpFormFields?.[selectedStrategy]?.formFields || [];
    formInstance.setFieldsValue(getDefaultValues(strategyFields));
  }, [selectedStrategy, formInstance, DemandRpFormFields]);

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
  }, [formInstance, location.pathname, location.state, navigate, getData]);

  const strategyName = DemandRpFormFields?.[selectedStrategy]?.title;
  return (
    <PageBox headerTitle={`${routeName} Demand Response`}>
      <ScopeStyle>
        <Form
          form={formInstance}
          initialValues={getDefaultValues([...FormFields()])}
        >
          <OuterFrame title={'基本設定'}>
            <div className="item">
              {FormFields()?.map((item, idx) => (
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
            <Row className="item">
              <Col className="mg-y-20" lg={{ span: 7 }} span={24}>
                {/* <Typography
                  color={color.themeBlack}
                  md={{ size: 'sm' }}
                  size="md"
                >
                  {DemandRpFormFields?.[selectedStrategy]?.title}
                </Typography> */}
              </Col>
              <Col lg={{ span: 8 }} span={24}>
                {DemandRpFormFields?.[selectedStrategy]?.formFields?.map(
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
              {/* <Col className="mg-y-20" lg={{ span: 6 }} span={24}></Col> */}
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
