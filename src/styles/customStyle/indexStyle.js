import { css } from "styled-components";
import notoSans from "@/assets/font/NotoSans-VariableFont_wdth,wght.ttf";
import notoSansItalic from "@/assets/font/NotoSans-Italic-VariableFont_wdth,wght.ttf";
import { color } from "@/styles/variable/indexStyle";

//自定義加上className 即可調整寬度百分比
function customHeight() {
  let style = "";
  for (let i = 1; i <= 100; i++) {
    style += `
      .h-${i} {
        height: ${i}%;
      }
    `;
  }
  return style;
}

//自定義加上className 即可調整margin間距，例如：mg-t-20、mg-t-20-minus
function customMargin(maxNumber = 50) {
  const handleStaticMarginTypography = (marginTypography) => {
    let style = "";
    for (const type in marginTypography) {
      const direction = type.substring(3, 4);
      switch (direction) {
        case "t": {
          style += `
            .${type}{
              margin-top:${marginTypography[type]};
            }
          `;
          break;
        }
        case "r": {
          style += `
            .${type}{
              margin-right:${marginTypography[type]};
            }
          `;
          break;
        }
        case "b": {
          style += `
            .${type}{
                margin-bottom:${marginTypography[type]};
            }
          `;
          break;
        }
        case "l": {
          style += `
            .${type}{
                margin-left:${marginTypography[type]};
            }
          `;
          break;
        }
        case "x": {
          style += `
              .${type}{
                  margin-left:${marginTypography[type]};
                  margin-right:${marginTypography[type]};
              }
            `;
          break;
        }
        case "y": {
          style += `
              .${type}{
                  margin-top:${marginTypography[type]};
                  margin-bottom:${marginTypography[type]};
              }
            `;
          break;
        }
        default: {
          const str = type.substring(3);
          if (parseInt(str)) {
            style += `
              .${type}{
                margin:${marginTypography[type]};
              }
            `;
          }
          break;
        }
      }
    }
    return style;
  };
  const marginTypography = {};
  for (const [index] of Array(maxNumber + 1).entries()) {
    marginTypography[`mg-t-${index}`] = `${index}px`;
    marginTypography[`mg-t-${index}-minus`] = `-${index}px`;
    marginTypography[`mg-r-${index}`] = `${index}px`;
    marginTypography[`mg-r-${index}-minus`] = `-${index}px`;
    marginTypography[`mg-b-${index}`] = `${index}px`;
    marginTypography[`mg-b-${index}-minus`] = `-${index}px`;
    marginTypography[`mg-l-${index}`] = `${index}px`;
    marginTypography[`mg-l-${index}-minus`] = `-${index}px`;
    marginTypography[`mg-x-${index}`] = `${index}px`;
    marginTypography[`mg-y-${index}`] = `${index}px`;
    marginTypography[`mg-${index}`] = `${index}px`;
  }
  return css`
    ${handleStaticMarginTypography(marginTypography)}
    .mg-0 {
      margin: 0;
    }
    .mg-t-auto {
      margin-top: auto;
    }
    .mg-r-auto {
      margin-right: auto;
    }
    .mg-b-auto {
      margin-bottom: auto;
    }
    .mg-l-auto {
      margin-left: auto;
    }
    .mg-x-auto {
      margin-left: auto;
      margin-right: auto;
    }
    .mg-y-auto {
      margin-top: auto;
      margin-bottom: auto;
    }
  `;
}
//自定義加上className 即可調整padding間距，例如：pd-t-20
function customPadding(maxNumber = 50) {
  const handleStaticPaddingTypography = (paddingTypography) => {
    let style = "";
    for (const type in paddingTypography) {
      const direction = type.substring(3, 4);
      switch (direction) {
        case "t": {
          style += `
            .${type}{
              padding-top:${paddingTypography[type]};
            }
          `;
          break;
        }
        case "r": {
          style += `
            .${type}{
              padding-right:${paddingTypography[type]};
            }
          `;
          break;
        }
        case "b": {
          style += `
            .${type}{
              padding-bottom:${paddingTypography[type]};
            }
          `;
          break;
        }
        case "l": {
          style += `
            .${type}{
              padding-left:${paddingTypography[type]};
            }
          `;
          break;
        }
        case "x": {
          style += `
                .${type}{
                  padding-left:${paddingTypography[type]};
                  padding-right:${paddingTypography[type]};
                }
              `;
          break;
        }
        case "y": {
          style += `
                .${type}{
                  padding-top:${paddingTypography[type]};
                  padding-bottom:${paddingTypography[type]};
                }
              `;
          break;
        }
        default: {
          const str = type.substring(3);
          if (parseInt(str)) {
            style += `
              .${type}{
                padding:${paddingTypography[type]};
              }
            `;
          }
          break;
        }
      }
    }
    return style;
  };
  const paddingTypography = {};
  for (const [index] of Array(maxNumber + 1).entries()) {
    paddingTypography[`pd-t-${index}`] = `${index}px`;
    paddingTypography[`pd-r-${index}`] = `${index}px`;
    paddingTypography[`pd-b-${index}`] = `${index}px`;
    paddingTypography[`pd-l-${index}`] = `${index}px`;
    paddingTypography[`pd-x-${index}`] = `${index}px`;
    paddingTypography[`pd-y-${index}`] = `${index}px`;
    paddingTypography[`pd-${index}`] = `${index}px`;
  }
  return css`
    ${handleStaticPaddingTypography(paddingTypography)}
    .pd-0 {
      padding: 0;
    }
    .pd-t-auto {
      padding-top: auto;
    }
    .pd-right-auto {
      padding-right: auto;
    }
    .pd-b-auto {
      padding-bottom: auto;
    }
    .pd-l-auto {
      padding-left: auto;
    }
  `;
}
//自定義全域樣式
function commonStyle() {
  return css`
    @font-face {
      font-family: "Noto Sans";
      src: url(${notoSans});
      font-display: swap;
      font-style: normal;
    }
    @font-face {
      font-family: "Noto Sans";
      src: url(${notoSansItalic});
      font-display: swap;
      font-style: italic;
    }
    :root {
      --font-family: "Noto Sans";
      --font-size: 16px;
      font-size: var(--font-size);
    }
    body {
      font-family: var(--font-family);
      color: ${color.white};
      background: linear-gradient(
        180deg,
        ${color.themeBlue} 0%,
        ${color.themeBlack} 100%
      );
    }
    ul {
      list-style-type: none;
      padding-left: 0;
      margin: 0;
    }
    .clearfix {
      &::after {
        display: block;
        clear: both;
        content: "";
      }
    }
  `;
}
//自定義scollbar樣式
function customScollbar() {
  return css`
    /* width */
    ::-webkit-scrollbar {
      width: 7px;
      height: 7px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px #d7d7d7;
      border-radius: 10px;
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #838795;
      border-radius: 10px;
    }
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #b3b8c7;
    }
  `;
}
//自定義加上className 即可調整寬度百分比
function customWidth() {
  let style = "";
  for (let i = 1; i <= 100; i++) {
    style += `
      .w-${i} {
        width: ${i}%;
      }
    `;
  }
  return style;
}
const style = css`
  ${customHeight}
  ${customMargin(50)}
  ${customPadding(50)}
  ${commonStyle}
  ${customScollbar}
  ${customWidth}
`;

export { customScollbar };
export default style;
