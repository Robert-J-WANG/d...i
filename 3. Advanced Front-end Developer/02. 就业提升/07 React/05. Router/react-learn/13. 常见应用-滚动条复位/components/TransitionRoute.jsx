import React from "react";
import { Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "animate.css";

export default function TransitionRoute({
  component: Component,
  children,
  ...rest
}) {
  return (
    <Route {...rest}>
      {({ match }) => {
        return (
          <CSSTransition
            in={match ? true : false}
            timeout={500}
            classNames={{
              enter: "animate__animated faster animate__fadeInLeft",
              exit: "animate__animated faster animate__fadeOutRight",
            }}
            // 当进入（in=ture）是挂载内部的子组件
            mountOnEnter={true}
            // 当退出（in=false）时卸载内部的子组件
            unmountOnExit={true}
          >
            <Component />
          </CSSTransition>
        );
      }}
    </Route>
  );
}
