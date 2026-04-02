import { forwardRef } from "react";
import { Card } from "antd";
import ScopeStyle from "./indexStyle";

function TransparentCard({ className, children,theme }) {
  return (
    <ScopeStyle $theme={theme}>
      <Card className={className} size="lg">
        {children}
      </Card>
    </ScopeStyle>
  );
}
export default forwardRef(TransparentCard);
