import styled, { css } from 'styled-components';
import { color } from '@/styles/variable/indexStyle';

const getFontSize = (size) => {
  switch (size) {
    case 'lg':
      return 'clamp(16px, 1.2vw, 20px)';
    case 'md':
      return 'clamp(14px, 1.2vw, 18px)';
    case 'sm':
      return 'clamp(12px, 1.2vw, 16px)';
    case 'xl':
      return 'clamp(20px, 1.2vw, 24px)';
    case 'xs':
      return 'clamp(10px, 1.2vw, 14px)';
    case 'xxl':
      return 'clamp(28px, 1.2vw, 32px)';
    default:
      return 'clamp(16px, 1.2vw, 20px)';
  }
};

const breakpointMap = {
  lg: '(min-width: 992px)',
  md: '(min-width: 768px)',
  sm: '(min-width: 576px)',
  xl: '(min-width: 1200px)',
  xs: '(max-width: 575px)',
  xxl: '(min-width: 1600px)',
};

const getResponsiveStyle = (mediaQuery, config) => {
  if (!config) return '';

  return css`
    @media ${mediaQuery} {
      span {
        ${config.size ? `font-size: ${getFontSize(config.size)};` : ''}
        ${config.color ? `color: ${config.color};` : ''}
        ${config.weight ? `font-weight: ${config.weight};` : ''}
      }
    }
  `;
};

const style = styled.div`
  span {
    font-size: ${(props) => getFontSize(props.$size)};
    color: ${(props) => props.$colors || color.white};
    font-weight: ${(props) => props.$weight || '400'};
  }

  ${(props) => getResponsiveStyle(breakpointMap.xs, props.$xs)}
  ${(props) => getResponsiveStyle(breakpointMap.sm, props.$sm)}
  ${(props) => getResponsiveStyle(breakpointMap.md, props.$md)}
  ${(props) => getResponsiveStyle(breakpointMap.lg, props.$lg)}
  ${(props) => getResponsiveStyle(breakpointMap.xl, props.$xl)}
  ${(props) => getResponsiveStyle(breakpointMap.xxl, props.$xxl)}
`;

export default style;
