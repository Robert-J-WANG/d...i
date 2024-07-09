import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  // Link,
  NavLink,
  Switch,
  Redirect,
} from "react-router-dom";
// import route from "./route/configRoute.js";
import route from "./configRouteWithComp.js";

// function Home() {
//   return <div>Home Page</div>;
// }

// function About() {
//   return <div>About Page</div>;
// }

// function UserLogin() {
//   return <div>UserLogin Page</div>;
// }
// function UserAdd() {
//   return <div>UserAdd Page</div>;
// }

/* -------------------- 1. 原始嵌套路由的使用 -------------------- */
// function User() {
//   return (
//     <div>
//       <h1>User Page</h1>
//       <div className="content">
//         <div className="left box">
//           <Link to="/user/login">Login</Link>
//           <Link to="/user/add">Add</Link>
//         </div>
//         <div className="right box">
//           <Switch>
//             <Route path="/user/login" component={UserLogin} />
//             <Route path="/user/add" component={UserAdd} />
//             <Redirect to="/user/login" />
//           </Switch>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <div className="container">
//         {/* 头部导航栏 */}
//         <header className="box">
//           <NavLink to="/home">Home</NavLink>
//           <NavLink to="/about" style={{ margin: "20px" }}>
//             About
//           </NavLink>
//           <NavLink to="/user">User</NavLink>
//         </header>
//         {/* 页面切换栏 */}
//         <main className="box">
//           <Switch>
//             <Route exact path="/home" component={Home} />
//             <Route path="/about" component={About} />
//             <Route path="/user" component={User} />
//             <Redirect to="/home" />
//           </Switch>
//         </main>
//       </div>
//     </Router>
//   );
// }

/* --------------------- 2. 使用路由配置表 --------------------- */

// const { home, about, user } = route;

// function User() {
//   return (
//     <div>
//       <h1>User Page</h1>
//       <div className="content">
//         <div className="left box">
//           <Link to={user.login}>Login</Link>
//           <Link to={user.add}>Add</Link>
//         </div>
//         <div className="right box">
//           <Switch>
//             <Route path={user.login} component={UserLogin} />
//             <Route path={user.add} component={UserAdd} />
//             <Redirect to={user.login} />
//           </Switch>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <div className="container">
//         {/* 头部导航栏 */}
//         <header className="box">
//           <NavLink to={home.path}>Home</NavLink>
//           <NavLink to={about.path} style={{ margin: "20px" }}>
//             About
//           </NavLink>
//           <NavLink to={user.path}>User</NavLink>
//         </header>
//         {/* 页面切换栏 */}
//         <main className="box">
//           <Switch>
//             <Route exact path={home.path} component={Home} />
//             <Route path={about.path} component={About} />
//             <Route path={user.path} component={User} />
//             <Redirect to={home.path} />
//           </Switch>
//         </main>
//       </div>
//     </Router>
//   );
// }

/* ------------------ 3. 使用路由配置表-组件也抽离 ------------------ */
const { home, about, user } = route;

export default function App() {
  return (
    <Router>
      <div className="container">
        {/* 头部导航栏 */}
        <header className="box">
          <NavLink to={home.path}>Home</NavLink>
          <NavLink to={about.path} style={{ margin: "20px" }}>
            About
          </NavLink>
          <NavLink to={user.path}>User</NavLink>
        </header>
        {/* 页面切换栏 */}
        <main className="box">
          <Switch>
            <Route exact path={home.path} component={home.component} />
            <Route path={about.path} component={about.component} />
            <Route path={user.path} component={user.component} />
            <Redirect to={home.path} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}
