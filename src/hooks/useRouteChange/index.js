import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/* 
  監聽路由變化
  callback: function (location,navigationType){}
*/
function useRouteChange(callback) {
  const location = useLocation();
  const navigationType = useNavigationType(); // 'POP', 'PUSH', or 'REPLACE'

  useEffect(() => {
    if (typeof callback === "function") {
      callback(location, navigationType);
    }
  }, [location, navigationType, callback]);

  return { location, navigationType }; // 可選：返回當前路由資訊
}

export default useRouteChange;
