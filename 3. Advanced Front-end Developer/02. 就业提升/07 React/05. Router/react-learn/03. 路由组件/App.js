import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

/* -------------------- 1. Route组件的使用 ------------------- */
// "/a"
function CompA() {
  return <div> Component A</div>;
}
// "a/b"
function CompAB() {
  return <div> Component AB</div>;
}
// "a/c"
function CompAC() {
  return <div> Component AC</div>;
}

//不设置路径
function CompAny() {
  return <div>  任意组件</div>;
}
export default function App() {
  return (
    <BrowserRouter>
      {/* exact属性为true,路径精确匹配 */}
      <Route path="/a" component={CompA} exact>
        {/* <h2 style={{ color: "red" }}>一定能看到的内容</h2>
        <p>hello world</p> */}

        {() => {
          return (
            <div>
              <h2 style={{ color: "red" }}>一定能看到的内容</h2>
              <p>hello world</p>
            </div>
          );
        }}
      </Route>
      {/* 设置sensitive属性为true，来区分大小写 */}
      <Route path="/a/b" component={CompAB} sensitive />
      <Route path="/a/c" component={CompAC} />
      {/* 不写path，则会匹配任意路径 */}
      <Route component={CompAny} />
    </BrowserRouter>
  );
}

/* ------------------- 2. Switch组件的使用 ------------------- */
// // "/a"
// function CompA() {
//   return <div> Component A</div>;
// }
// // "a/b"
// function CompAB() {
//   return <div> Component AB</div>;
// }
// // "a/c"
// function CompAC() {
//   return <div> Component AC</div>;
// }

// //不设置路径
// function ErrorPage() {
//   return <div>  404 访问点页面找不到！</div>;
// }
// export default function App() {
//   return (
//     <BrowserRouter>
//       <Switch>
//         <Route path="/a" component={CompA} />
//         <Route path="/a/b" component={CompAB} />
//         <Route path="/a/c" component={CompAC} />
//         {/* 不能再Switch组件中使用出Route之外的其他组件，比如div */}
//         <div>i am a div</div>
//         <Route component={ErrorPage} />
//       </Switch>
//     </BrowserRouter>
//   );
// }
