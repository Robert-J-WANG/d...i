// 清除eslint插件语法检查警告
/* eslint "react-hooks/exhaustive-deps": "off" */

import { useEffect } from "react";

/**
 * 自定义定时器hook,
 * 组件挂载后启动计时器，
 * 组件销毁时清除定时器
 * @param {*} func 定时器里需要执行的函数
 * @param {*} duration 定时器时间间隔
 */
export default function useTime(func, duration) {
  useEffect(() => {
    const timer = setInterval(func, duration);
    return () => {
      clearInterval(timer);
    };
  }, []);
}
