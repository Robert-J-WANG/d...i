import * as doms from "./doms.js";
import login from "./login.js";

doms.formContainer.onsubmit = (e) => {
  e.preventDefault();
  login();
};
