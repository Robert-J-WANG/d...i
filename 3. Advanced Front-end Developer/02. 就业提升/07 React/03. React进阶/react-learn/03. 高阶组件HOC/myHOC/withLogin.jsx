import React from "react";

/**
 * 只关注是否登录的逻辑
 * @param {*} Comp
 * @returns
 */
export default function withLogin(Comp) {
  return function LoginWrapper(props) {
    if (props.isLogin) {
      return <Comp {...props} />;
    }
    return null;
  };
}
