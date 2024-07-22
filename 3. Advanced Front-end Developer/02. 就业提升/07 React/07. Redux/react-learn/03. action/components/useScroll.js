import { useEffect } from "react";
import setScroll from "./setScroll";

export default function useScroll(pathname) {
  useEffect(() => {
    setScroll();
  }, [pathname]); // 依赖项：路由路径——只有当路径发生变化时，才执行副作用
}
