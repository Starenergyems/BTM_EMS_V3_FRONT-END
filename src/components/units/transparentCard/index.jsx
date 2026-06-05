import { forwardRef } from "react";
import { Card } from "antd";
import ScopeStyle from "./indexStyle";

function TransparentCard({ children, className,theme }) {
  return (
    <ScopeStyle $theme={theme}>
      <Card className={className} size="lg">
        {children}
      </Card>
    </ScopeStyle>
  );
}
export default forwardRef(TransparentCard);
