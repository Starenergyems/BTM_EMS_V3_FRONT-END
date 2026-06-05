import AwardStatus from "./awardStatus";
import DispatchCommandList from "./dispatchCommandList";
import ServiceProduct from "./serviceProduct";
import ScopeStyle from "./indexStyle";

function RealTimeSpinningReserve() {
  return (
    <ScopeStyle className="pd-y-30 pd-x-50">
      {/* 得標狀態 */}
      <AwardStatus />
      {/* 服務商品 */}
      <ServiceProduct />
      {/* 調度指令列表 */}
      <DispatchCommandList />
    </ScopeStyle>
  );
}

export default RealTimeSpinningReserve;
