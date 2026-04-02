import styled from 'styled-components';
import { color } from '@/styles/variable/indexStyle';
import { customScollbar } from '@/styles/customStyle/indexStyle';

const ScopeStyle = styled.div`
  margin-bottom: 20px;
  border-radius: 20px;
  overflow: hidden;
  background: ${color.lightGray};
  .form-header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    background: ${color.inputGray};
  }
  .form-icon {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
  .form-frame {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: calc(100% - 60px);
    padding-bottom: 20px;
  }
  .form-content {
    width: 100%;
    padding: 0 24px;
  }
  .form-item {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }

  .ant-row {
    display: flex;
    align-items: baseline;
    flex-direction: row;
    gap: 10px;
    margin: 20px auto;
    padding: 0;
  }
  .ant-col {
    width: auto;
    padding: 0;
    text-align: left;
  }
  .ant-form-item {
    margin: 0;
  }
`;

export { ScopeStyle };
