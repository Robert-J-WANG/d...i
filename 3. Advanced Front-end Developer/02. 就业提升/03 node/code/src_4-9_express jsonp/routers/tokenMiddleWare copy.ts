import { ForbiddenError } from "../utils/errors";
import { match } from "path-to-regexp";

const needTokenApis = [
  {
    method: "GET",
    path: "/api/student",
  },
  {
    method: "POST",
    path: "/api/student",
  },
  {
    method: "PUT",
    path: "/api/student/:id",
  },
  {
    method: "DELETE",
    path: "/api/student/:id",
  },
];

export const tokenMiddleWare = (req, res, next) => {
  /* ------------ 匹配是否需要验证 ------------ */

  const apis = needTokenApis.filter(
    (api) => api.method === req.method && isPathMatch(api.path, req.path)
  );
  if (apis.length === 0) {
    // 不在需要token的列表里，不执行后面的token验证
    next();
    return;
  }

  /* ------------ 需要token验证 ----------- */

  // 浏览器从cookie获取token
  let token = req.cookies?.token;
  if (!token) {
    //  没有通过cookie传递，其他设备从header获取
    token = req.headers.authorization;
  }
  if (!token) {
    // 没有token,没有登录
    throw ForbiddenError("you can not access the api");
  }
  // 有token, 进行认证
  next();
};

/**
 * 检测2个path是否匹配
 * 比如："/api/student/:id" 和 "/api/student/17"
 * @param pathPattern
 * @param url
 * @returns
 */
function isPathMatch(pathPattern: string, url: string) {
  const matcher = match(pathPattern, { decode: decodeURIComponent });
  return !!matcher(url); // 返回 true / false
}
