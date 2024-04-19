import React, { useState } from "react";
import Timer from "./Timer";

export default function App() {
  const [disable, setDisable] = useState(true);
  return (
    <div>
      <Timer />
      <Timer />
      {disable ? <Timer /> : null}
      <button
        onClick={() => {
          setDisable(!disable);
        }}
      >
        显示/隐藏
      </button>
    </div>
  );
}
