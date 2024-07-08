// 去除a标签url路径格式的报错
/* eslint {"jsx-a11y/anchor-is-valid":"off", "no-script-url":"off"} */

import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Link,
  NavLink,
  Switch,
  Redirect,
} from "react-router-dom";

/* -------------- 1. 使用a标签的普通跳转（页面刷新，用户体验差） ------------- */

/* 
function PageA() {
  return <div>This is the Page A</div>;
}
function PageB() {
  return <div>This is the Page B</div>;
}
function Navbar() {
  return (
    <div>
      <a href="/a">Go to the Page A</a>
      <a href="/b">Go to the Page B</a>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route path="/a" component={PageA} />
        <Route path="/b" component={PageB} />
      </div>
    </Router>
  );
} 
*/

/* ------------- 2.手动制作自己的无刷跳转组件:组件Link的基本原理 ------------ */

/* function PageA() {
  return <div>This is the Page A</div>;
}
function PageB() {
  return <div>This is the Page B</div>;
}
// 自定义Link组件执行无刷跳转
function MyLink(props) {
  return (
    <a
      href={props.to}
      onClick={(e) => {
        // 阻止事件的默认行为（防止默认的点击跳转）
        e.preventDefault();
        // 使用props.history.push()方法实现路径跳转
        // 但是，不同组件的props没有history属性
        // 可以使用包裹高阶组件withRouter实现
        console.log(props);
        props.history.push(props.to);
      }}
    >
      {props.children}
    </a>
  );
}
// 包裹高阶组件withRouter,使用props的history属性
const NewLink = withRouter(MyLink);

function Navbar() {
  return (
    <div>
      <NewLink to="/a">Go to the Page A</NewLink>
      <NewLink to="/b">Go to the Page B</NewLink>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route path="/a" component={PageA} />
        <Route path="/b" component={PageB} />
      </div>
    </Router>
  );
} */

/* ---------- 3. 使用Link组件(react-router已经封装)实现跳转 --------- */

/* function PageA() {
  return <div>This is the Page A</div>;
}
function PageB() {
  return <div>This is the Page B</div>;
}

function Navbar() {
  return (
    <div>
      <Link to="/a">Go to the Page A</Link>
      <Link to="/b">Go to the Page B</Link>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route path="/a" component={PageA} />
        <Route path="/b" component={PageB} />
      </div>
    </Router>
  );
} */

/* ----- 4. 使用NavLink(Link组件的基础上添加了active类名，用来设置样式) ----- */

/* function PageA() {
  return <div>This is the Page A</div>;
}
function PageB() {
  return <div>This is the Page B</div>;
}

function Navbar() {
  return (
    <div>
      <NavLink to="/a">Go to the Page A</NavLink>
      <NavLink to="/b">Go to the Page B</NavLink>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route path="/a" component={PageA} />
        <Route path="/b" component={PageB} />
      </div>
    </Router>
  );
} */

/* -------------------- 5. 匹配时使用自定义类名 ------------------- */

// function PageA() {
//   return <div>This is the Page A</div>;
// }
// function PageB() {
//   return <div>This is the Page B</div>;
// }

// function Navbar() {
//   return (
//     <div>
//       {/* 匹配时使用自定义类名 "selected" */}
//       <NavLink activeClassName="selected" to="/a">
//         Go to the Page A
//       </NavLink>
//       <NavLink to="/b">Go to the Page B</NavLink>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <div className="container">
//         <Navbar />
//         <Route path="/a" component={PageA} />
//         <Route path="/b" component={PageB} />
//       </div>
//     </Router>
//   );
// }

/* ----------- 6. Redirect组件（匹配不到是，重定向到指定的路径） ----------- */

function PageA() {
  return <div>This is the Page A</div>;
}
function PageB() {
  return <div>This is the Page B</div>;
}

function Navbar() {
  return (
    <div>
      {/* 匹配时使用自定义类名 "selected" */}
      <NavLink activeClassName="selected" to="/a">
        Go to the Page A
      </NavLink>
      <NavLink to="/b">Go to the Page B</NavLink>
      <NavLink to="/abc">其他页面</NavLink>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Switch>
          <Route path="/a" component={PageA} />
          <Route path="/b" component={PageB} />
          {/* 找不到其他页的路径，重定向到首页 */}
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}
