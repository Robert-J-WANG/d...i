import React from "react";
// import CheckboxTest from "./components/common/CheckboxGroup/CheckboxTest";
// import RadioTest from "./components/common/RadioBoxGroup/RadioTest";
// import SelectTest from "./components/common/SelectGroup/SelectTest";
// import ThreeLayout from "./components/common/ThreeLayout";
// import ModalTest from "./components/common/Modal/ModalTest";
import BannerTest from "./components/common/Banner/BannerTest";
import FormTest from "./components/common/Form/FormTest";
import TaskContainer from "./components/pureComponent/TaskContainer";

export default function App() {
  return (
    <div>
      {/* 三栏布局+表单组件 */}
      {/* <ThreeLayout
        leftWidth={500}
        rightWidth={500}
        gap={50}
        children={<SelectTest />}
        left={<RadioTest />}
        right={<CheckboxTest />}
      /> */}
      {/* 蒙层 */}
      {/* <ModalTest /> */}
      {/* 轮播图 */}
      <BannerTest />
      {/* form表单 */}
      <FormTest />
      {/* 纯组件任务列表 */}
      <TaskContainer />
    </div>
  );
}
