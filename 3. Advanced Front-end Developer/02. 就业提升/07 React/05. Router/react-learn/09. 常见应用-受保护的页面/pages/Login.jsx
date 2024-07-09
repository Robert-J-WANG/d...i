import React from "react";
import loginData from "../loginData";
import qs from "query-string";

export default function Login(props) {
  return (
    <div>
      <h1>登录页</h1>
      <p>只是个测试页面，点击按钮表示登录</p>
      <button
        onClick={() => {
          loginData.login();
          // 方法一：
          // const query = qs.parse(props.location.search);
          // console.log(query);
          // // 使用history对象的push方法实现跳转
          // query.returnUrl
          //   ? props.history.push(query.returnUrl)
          //   : props.history.push("/");

          // 方法二：
          props.location.state
            ? props.history.push(props.location.state)
            : props.history.push("/");
        }}
      >
        登录
      </button>
    </div>
  );
}
