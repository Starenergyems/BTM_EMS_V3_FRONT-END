import { Link } from "react-router-dom";
import { Button } from "antd";
import ScopeStyle from "./indexStyle";
import { pagesPathName } from "@/router";

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
