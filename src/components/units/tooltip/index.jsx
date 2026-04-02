import { Tooltip as AntdTooltip } from "antd";
import { Icon } from "@iconify/react";
import { GlobalStyle, ScopeStyle } from "@/components/units/tooltip/indexStyle";
import { color } from "@/styles/variable/indexStyle";

function Tooltip({
  children,
  className,
  contentStyles,
  iconAttr,
  title,
  tooltipAttr,
}) {
  const iconAttrObj = {
    color: color.darkGray,
    fontSize: 20,
    icon: "ant-design:info-circle-outlined",
    ...iconAttr,
  };
  return (
    <ScopeStyle
      className={`styled-container-tooltip ${className ?? ""}`}
      $tooltipAttr={tooltipAttr}
    >
      <AntdTooltip placement="bottomRight" title={title} {...tooltipAttr}>
        {/* 這個容器不加會有findDOMNode is deprecated的錯誤，屬於ant design設計問題的解決方式*/}
        <div className="trigger-container">
          {children ?? <Icon {...iconAttrObj} />}
        </div>
      </AntdTooltip>
      <GlobalStyle $contentStyles={contentStyles} $tooltipAttr={tooltipAttr} />
    </ScopeStyle>
  );
}
export default Tooltip;
