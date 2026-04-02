import { color } from '@/styles/variable/indexStyle';
import { Form } from 'antd';
import Typography from '@/components/units/typography';
import { ScopeStyle } from './indexStyle';
import Button from '@/components/units/button';
import { renderField } from '@/components/widgets/modalForm/indexHelper';
import { formConfig, onSubmit } from './indexHelper';

export const FormOverview = ({ formInstance, title, type }) => {
  const config = formConfig(formInstance)[type] || [];

  return (
    <ScopeStyle>
      <div className="form-header">
        <Typography size="lg" color={color.themeBlack}>
          {title}
        </Typography>
      </div>
      <div className="form-frame">
        <div className="form-content">
          {config?.map((item, idx) => (
            <div
              className={`form-item ${item?.isFrame ? 'form-item-frame' : 'form-item-no-frame'}`}
              key={`form-item_${idx}`}
            >
              {item?.children &&
                item.children.map((child, childIdx) => (
                  <Form.Item
                    key={`form-item-${idx}-${childIdx}`}
                    {...child.formItemAttr}
                  >
                    {renderField(child)}
                  </Form.Item>
                ))}
            </div>
          ))}
        </div>
        <Button size="md" type="primary" onClick={() => onSubmit(formInstance)}>
          <Typography size="lg">儲存</Typography>
        </Button>
      </div>
    </ScopeStyle>
  );
};
