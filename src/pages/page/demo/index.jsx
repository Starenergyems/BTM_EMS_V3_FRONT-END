import { PageBox } from "@/components/units";
import ScopeStyle from "./indexStyle";

function Demo() {
  return (
    <ScopeStyle>
      <PageBox headerTitle="示範頁面 Demo Page">
        <h1>Demo Page</h1>
        <h4>示範margin-top:30px (className加上mg-t-30) ：</h4>

        <div className="mg-t-30">
          Lorem idivsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam
        </div>
        <h4>示範margin-top:-10px (className加上mg-t-10-minus)：</h4>
        <div className="mg-t-10-minus">
          Lorem idivsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam
        </div>
        <h4>示範padding-left:30px (className加上pd-l-30)：</h4>
        <div className="pd-l-30">
          Lorem idivsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam
        </div>
        <h4>示範width:50% (className加上w-50)</h4>
        <div className="w-50">
          Lorem idivsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam
        </div>
        <h4>示範height:30% (className加上h-30)</h4>
        <div className="container">
          <div className="h-30">我是容器內的元素，高度只有容器的30%</div>
        </div>
      </PageBox>
    </ScopeStyle>
  );
}

export default Demo;
