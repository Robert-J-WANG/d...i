import React, { useMemo, useState } from "react";

class Item extends React.Component {
  render() {
    console.log("Item render");
    return <li>{this.props.value}</li>;
  }
}
/* --- 1. input输入内容时，尽管Item 内容没有任何变化，但是都会重绘，大量数据时，非常耗时 -- */
/* export default function App() {
  console.log("App render");
  const [range] = useState({ min: 1, max: 5000 });
  const [txt, setTxt] = useState("hello");
  const list = [];
  for (let i = range.min; i <= range.max; i++) {
    list.push(<Item key={i} value={i} />);
  }
  return (
    <>
      <input type="text" value={txt} onChange={(e) => setTxt(e.target.value)} />
      <ul>{list}</ul>
    </>
  );
} */

/* ----------- 2. 使用useMemo() hook，依赖项为空。固定耗时渲染的数list----------- */

// export default function App() {
//   console.log("App render");
//   const [range] = useState({ min: 1, max: 5000 });
//   const [txt, setTxt] = useState("hello");
//   const list = useMemo(() => {
//     const list = [];
//     for (let i = range.min; i <= range.max; i++) {
//       list.push(<Item key={i} value={i} />);
//     }
//     return list;
//   }, []); // 空数组不依赖任何数据的变化

//   return (
//     <>
//       <input type="text" value={txt} onChange={(e) => setTxt(e.target.value)} />
//       <ul>
//         {/* 使用useMemo hook返回的结果 */}
//         {list}
//       </ul>
//     </>
//   );
// }

/* --------------------- 3. 也可以设置依赖项 -------------------- */
export default function App() {
  console.log("App render");
  const [txt, setTxt] = useState("hello");
  const [max, setMax] = useState(1000);
  const list = useMemo(() => {
    const list = [];
    for (let i = 1; i <= max; i++) {
      list.push(<Item key={i} value={i} />);
    }
    return list;
  }, [max]); // 设置依赖项数据，只有range.min或者n变化时，useMemo的返回值才变化

  return (
    <>
      <input type="text" value={txt} onChange={(e) => setTxt(e.target.value)} />
      <input
        type="number"
        value={max}
        onChange={(e) => setMax(e.target.value)}
      />
      <ul>
        {/* 使用useMemo hook返回的结果 */}
        {list}
      </ul>
    </>
  );
}
