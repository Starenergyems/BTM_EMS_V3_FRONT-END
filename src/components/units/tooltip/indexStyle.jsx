import * as styled from 'styled-components';
import { color } from '@/styles/variable/indexStyle';

//tooltip顯示出來的樣式
//發現createGlobalStyle不使用styled.createGlobalStyle的方式，prettier會沒效果
const GlobalStyle = styled.createGlobalStyle`
  .ant-tooltip {
    --ant-color-bg-spotlight: ${color.white};
    --ant-border-radius: 16px;
    --ant-control-height: 24px;
    --ant-font-size: 16px;

    ${(props) => {
      if (!props?.$tooltipAttr?.color) {
        return styled.css`
          --ant-color-text-light-solid: ${color.darkGray};
        `;
      }
    }}

    .ant-tooltip-arrow {
      display: none;
    }
    .ant-tooltip-content {
      ${(props) => {
        const placement = props?.$tooltipAttr?.placement;
        if (!placement || (placement && placement.includes('bottom'))) {
          return styled.css`
            margin-top: -8px;
          `;
        } else if (placement && placement.includes('top')) {
          return styled.css`
            margin-bottom: -8px;
          `;
        } else if (placement && placement.includes('left')) {
          return styled.css`
            margin-right: -8px;
          `;
        } else if (placement && placement.includes('right')) {
          return styled.css`
            margin-left: -8px;
          `;
        }
        if (placement === 'bottomRight') {
          return styled.css`
            --ant-color-text-light-solid: ${color.darkGray};
          `;
        }
      }}
      .ant-tooltip-inner {
        box-shadow: none;
        padding-top: 6px;
        padding-bottom: 6px;
        border-radius: var(--ant-border-radius);
        box-shadow: 0 3px 5px #acacac;
      }
    }
    ${(props) => props.$contentStyles}
  }
`;
// 觸發tooltip的元素樣式
const ScopeStyle = styled.styled.div`
  .trigger-container{
    display:flex;
    align-items:center;
    height:100%;
  }
`;

export { GlobalStyle, ScopeStyle };
