import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageBox } from '@/components/units';
import { pagesPathName } from '@/router';
import { Col, Form, Row } from 'antd';
import { Battery } from './battery';
import { FormOverview } from './formOverview';
import { useHelpers } from './indexHelper';
import { ScopeStyle } from './indexStyle';

function Setting() {
  const routeName = pagesPathName.setting.setting.pathName;
  const location = useLocation();
  const navigate = useNavigate();

  const [formInstance] = Form.useForm();

  const [state, setState] = useState(null);

  const hasInitializedRef = useRef(false);

  const { getDatas } = useHelpers({
    formInstance,
    setState,
  });

  useEffect(() => {
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    const nextPrefillEvent = location.state?.prefillEvent;
    const prefillValues = {
      ...(nextPrefillEvent?.data?.limit || {}),
      ...(nextPrefillEvent?.data?.switch || {}),
    };

    // 先套用 prefill，避免首屏閃動與後續被 API 蓋掉
    if (Object.keys(prefillValues).length > 0) {
      formInstance.setFieldsValue(prefillValues);
    }

    getDatas(prefillValues);

    if (!nextPrefillEvent) return;

    navigate(location.pathname, { replace: true, state: null });
  }, [formInstance, getDatas, location.pathname, location.state, navigate]);

  return (
    <PageBox headerTitle={`${routeName} Operation Settings`}>
      <ScopeStyle>
        <Form form={formInstance} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col xl={{ order: 1, span: 6 }} xs={{ order: 2, span: 24 }}>
              <FormOverview
                // key={`prefill-${prefillVersion}`}
                formInstance={formInstance}
                title="基本設定"
                type="base"
              />
            </Col>
            <Col xl={{ order: 2, span: 12 }} xs={{ order: 1, span: 24 }}>
              <Battery data={state && state} />
            </Col>
            <Col xl={{ order: 3, span: 6 }} xs={{ order: 3, span: 24 }}>
              <FormOverview
                formInstance={formInstance}
                title="進階設定"
                type="advanced"
              />
            </Col>
          </Row>
        </Form>
      </ScopeStyle>
    </PageBox>
  );
}

export default Setting;
