import React from "react";
import { Route, Redirect } from "react-router-dom";
import loginData from "../loginData";

export default function ProtectRoute({
  component: Component,
  chilren,
  render,
  ...rest
}) {
  return (
    <Route
      //  除去component，chilren，render之外的所以参数传递过去
      {...rest}
      // render和children的区别：render匹配后才运行渲染，而children无论匹配与否都会运行
      render={({ location }) => {
        if (loginData.isLogin) {
          // 如果授权成功，直接渲染这个组件
          return <Component />;
        } else {
          // 如果未授权（未登录）- 返回登录页
          return (
            // 方法一：使用传递地址栏参数
            // <Redirect
            //   to={{
            //     pathname: "/login",
            //     search: "?returnUrl=" + location.pathname,
            //   }}
            // />

            // 方法二：使用historyAPI的state属性
            <Redirect
              to={{
                pathname: "/login",
                state: location.pathname,
              }}
            />
          );
        }
      }}
    />
  );
}
