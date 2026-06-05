import { Link } from "react-router-dom";
import { pagesPathName } from "@/router";
import { Button } from "antd";
import ScopeStyle from "./indexStyle";

function NotFound() {
  return (
    <ScopeStyle>
      <div className="container">
        <h1>404 Not Found</h1>
        <Link to={pagesPathName.home.path}>
          <Button className="theme-primary">回首頁</Button>
        </Link>
      </div>
    </ScopeStyle>
  );
}

export default NotFound;
