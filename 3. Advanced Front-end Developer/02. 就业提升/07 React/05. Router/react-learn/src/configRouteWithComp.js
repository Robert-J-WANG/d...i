import { Home, About, User, UserLogin, UserAdd } from "./components";

const route = {
  home: { path: "/home", component: Home },
  about: { path: "/about", component: About },
  user: {
    path: "/user",
    component: User,
    login: {
      path: "/user/login",
      component: UserLogin,
    },
    add: {
      path: "/user/add",
      component: UserAdd,
    },
  },
};

export default route;
