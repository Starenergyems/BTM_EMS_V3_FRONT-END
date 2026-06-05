import Button from '@/components/units/button';
import Typography from '@/components/units/typography';
import { renderField } from '@/components/widgets/modalForm/indexHelper';
import { Form } from 'antd';
import { formConfig, onSubmit } from './indexHelper';
import { ScopeStyle } from './indexStyle';
import { color } from '@/styles/variable/indexStyle';

export const FormOverview = ({ formInstance, title, type }) => {
  const config = formConfig(formInstance)[type] || [];

  return (
    <ScopeStyle>
      <div className="form-header">
        <Typography color={color.themeBlack} size="lg">
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
        <Button onClick={() => onSubmit(formInstance)} size="md" type="primary">
          <Typography size="lg">儲存</Typography>
        </Button>
      </div>
    </ScopeStyle>
  );
};
