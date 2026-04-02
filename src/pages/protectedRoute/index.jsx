import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { pagesPathName } from "@/router";

function ProtectedRoute({ element: Element }) {
  const accountsState = useSelector((state) => state.apiAccounts);
  const splitStr = location.pathname.split("/");
  const pageItem = pagesPathName[splitStr[splitStr.length - 1]];
  const permissions = pageItem?.permissions;

  if (
    accountsState?.omRole !== null &&
    permissions &&
    !permissions.includes(accountsState?.omRole)
  ) {
    return <Navigate to={pagesPathName.notfound.path} replace />;
  }
  return <Element />;
}

export default ProtectedRoute;
