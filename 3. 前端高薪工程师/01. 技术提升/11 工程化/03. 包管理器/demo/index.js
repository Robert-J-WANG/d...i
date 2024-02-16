const _ = module.require("lodash");
const Mock = require("mockjs");

const re = _.chunk([1, 2, 3, 4], 2);
console.log(re);
const fname = Mock.mock({
  name: "@cname",
});
console.log(fname);
