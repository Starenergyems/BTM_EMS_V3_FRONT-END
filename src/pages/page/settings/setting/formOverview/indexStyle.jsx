import styled from 'styled-components';
import { color } from '@/styles/variable/indexStyle';

const ScopeStyle = styled.div`
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  background: ${color.lightGray};
  .form-header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    background: ${color.inputGray};
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
    padding: 20px 14px;
  }
  .form-item {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }
  .form-item-no-frame {
    padding: 20px 18px;
  }
  .form-item-frame {
    padding: 18px;
    border-radius: 12px;
    background: ${color.white};
    margin-bottom: 10px;
  }
  .ant-row {
    display: flex;
    align-items: baseline;
    flex-direction: row;
    flex-wrap: nowrap;
    // gap: 10px;
  }
  .ant-col {
    flex: auto !important;
    width: auto;
    padding: 0;
  }
  .ant-form-item {
    margin: 0;
  }
  .form-item {
    position: relative;
  }
  .input-unit {
    position: absolute;
    font-size: 12px;
  }
  .input-container {
    display: inline-block;
    max-width: 120px;
  }
`;

export { ScopeStyle };
