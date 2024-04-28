import React from "react";
import "./index.css";
import { CSSTransition } from "react-transition-group";

// 设置默认属性
FadeTransition.defaultProps = {
  timeout: 1000,
};

/**
 * 封装fade效果的动画组件，已经编写完成了统一的fade动画效果
 * @param {*} props
 * classNames="fade"： 其他定义的样式会被覆盖，不允许自定义动画样式
 * @returns
 */
export default function FadeTransition(props) {
  function addTransition(node) {
    node.style.transition = `opacity ${props.timeout}ms`;
  }
  function removeTransition(node) {
    node.style.transition = ``;
  }
  return (
    <div>
      <CSSTransition
        appear
        {...props}
        // 自定义类名，会覆盖掉用户自定义传入的类名--》不允许使用其他的样式
        classNames="fade"
        // 使用事件hook，手动设置style.transition
        onEntering={addTransition}
        onEntered={(node) => {
          removeTransition(node);
          props.onEntered && props.onEntered(node, props.show);
        }}
        onExiting={addTransition}
        onExited={(node) => {
          removeTransition(node);
          props.onExited && props.onExited(node);
        }}
      >
        {props.children}
      </CSSTransition>
    </div>
  );
}
