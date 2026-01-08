import { ForbiddenError } from "../utils/errors";
import { match } from "path-to-regexp";
import { studentRouters } from "./student";
import { decrypt } from "../utils/crypt";

export const tokenMiddleWare = (req, res, next) => {
  /* ------------ 匹配是否需要验证 ------------ */

  const authRequired = studentRouters.find((router) => {
    return (
      router.method === req.method &&
      isPathMatch(`/api/student` + router.path, req.path) &&
      router.authRequired
    );
  });

  if (!authRequired) {
    // 不在需要token的列表里，不执行后面的token验证
    next();
    return;
  }

  /* ------------ 需要token验证 ----------- */

  // 浏览器从cookie获取token,并解密
  let token = req.cookies?.token;
  // let token = req.signedCookies?.token; // 使用加密后的cookies

  if (!token) {
    //  没有通过cookie传递，其他设备从header获取,并解密
    token = req.headers.authorization;
  }
  if (!token) {
    // 没有token,没有登录
    throw ForbiddenError("you can not access the api");
  }
  // 有token, 进行认证
  // 解密token
  const userID = decrypt(token);
  res.setHeader("userID", userID);
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
