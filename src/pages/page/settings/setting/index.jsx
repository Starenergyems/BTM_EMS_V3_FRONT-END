import { useEffect, useState } from 'react';
import { pagesPathName } from '@/router';
import { Form, Row, Col } from 'antd';
import { PageBox } from '@/components/units';
import { ScopeStyle } from './indexStyle';
import { FormOverview } from './formOverview';
import { Battery } from './battery';
import { useHelpers } from './indexHelper';

function Setting() {
  const routeName = pagesPathName.setting.setting.pathName;

  const [state, setState] = useState(null);
  const [formInstance] = Form.useForm();

  const { getDatas } = useHelpers({
    setState,
    formInstance,
  });

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <PageBox headerTitle={`${routeName} Operation Settings`}>
      <ScopeStyle>
        <Form form={formInstance} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col xl={{ span: 6, order: 1 }} xs={{ span: 24, order: 2 }}>
              <FormOverview
                formInstance={formInstance}
                title="基本設定"
                type="base"
              />
            </Col>
            <Col xl={{ span: 12, order: 2 }} xs={{ span: 24, order: 1 }}>
              <Battery data={state && state} />
            </Col>
            <Col xl={{ span: 6, order: 3 }} xs={{ span: 24, order: 3 }}>
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
