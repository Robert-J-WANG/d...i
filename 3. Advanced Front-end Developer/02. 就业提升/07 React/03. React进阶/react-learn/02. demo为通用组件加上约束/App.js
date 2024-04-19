import React from "react";
import CheckboxTest from "./components/common/CheckboxGroup/CheckboxTest";
import RadioTest from "./components/common/RadioGroup/RadioTest";
import SelectTest from "./components/common/SelectGroup/SelectTest";
import ThreeLayout from "./components/common/ThreeLayout";
import ModalTest from "./components/common/Modal/ModalTest";

export default function App() {
  return (
    <div>
      <ThreeLayout
        leftWidth={500}
        rightWidth={500}
        gap={50}
        children={<SelectTest />}
        left={<RadioTest />}
        right={<CheckboxTest />}
      />
      <ModalTest />
    </div>
  );
}
