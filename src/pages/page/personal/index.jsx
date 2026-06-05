import { PageBox } from "@/components/units";
import { pagesPathName } from "@/router";
import ScopeStyle from "./indexStyle";

function Personal () {
  const routeName = pagesPathName.profile.personal.pathName
  return (
    <ScopeStyle>
      <PageBox headerTitle={routeName}>
      </PageBox>
    </ScopeStyle>
  );
}

export default Personal;
