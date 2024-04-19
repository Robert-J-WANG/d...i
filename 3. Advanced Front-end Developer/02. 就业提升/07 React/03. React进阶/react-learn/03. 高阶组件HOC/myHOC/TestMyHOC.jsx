import React from "react";
import { A, B } from "./Comps";
import withLog from "./withLog";
import withLogin from "./withLogin";
// const CompA = withTest(A);
// const CompB = withTest(B);
// 可以连续包裹多个功能
const LoginA = withLogin(withLog(A));
const LoginB = withLogin(withLog(B));
export default function TestMyHOC() {
  return (
    <div>
      {/* 测试高阶组件的使用 */}
      {/* <CompA/>
  <CompB/> */}
      <LoginA isLogin a={"a"} />
      <LoginB isLogin b={"b"} />
    </div>
  );
}
