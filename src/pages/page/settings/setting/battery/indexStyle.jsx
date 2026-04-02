import styled from 'styled-components';
import { color } from '@/styles/variable/indexStyle';
import { hexToRgba } from '@/styles/function';

const ScopeStyle = styled.div`
  height: 100%;
  padding: 0 8vw 0 6vw;
  .battery-content {
    position: relative;
    min-height: 600px;
    height: 100%;
  }
  .battery-title {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -150%);
  }
  .line-item {
    width: 100%;
    position: absolute;
  }
  .line {
    width: 100%;
    height: 1px;
    background: ${color.white};
  }
  .item {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    white-space: nowrap;
    &-value {
      left: 0;
      transform: translate(-100%, -50%);
      padding-right: 1rem;
    }
    &-label {
      right: 0;
      transform: translate(100%, -50%);
      padding-left: 1rem;
    }
  }
  .battery-container {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 16px;
  }
  .battery-value {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      ${hexToRgba(color.white, 0.5)} 0%,
      ${hexToRgba('#8BDFF3', 0.5)} 100%
    );
    box-shadow: inset 0px 0px 10px 2px ${hexToRgba(color.white, 0.25)};
    border-radius: 0 0 16px 16px;
    overflow: hidden;
  }
  .battery-label {
    position: absolute;
    left: 0;
    transform: translate(-138%, -50%);
  }

  @media (max-width: 576px) {
    .battery-content {
      min-height: 400px;
    }
    .item-label {
      width: 40px;
      white-space: break-spaces;
    }
  }
`;

export { ScopeStyle };
