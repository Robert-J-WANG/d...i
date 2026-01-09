const allowCorsOrigins = ["http://127.0.0.1:5500", "null"];

export const corsMiddleWare = (req, res, next) => {
  /* ------------- 处理简单请求 ------------- */
  if (
    "origin" in req.headers &&
    allowCorsOrigins.includes(req.headers.origin)
  ) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);

    /* ---------- 可选关键配置：暴露自定义头 --------- */
    // 这样前端 JS 才能通过 get('X-Custom-Data') 拿到值
    res.header(
      "Access-Control-Expose-Headers",
      "X-Custom-Data, Content-Length, Token"
    );

    /* ------------ 允许附带身份凭证的请求 ----------- */
    res.header("Access-Control-Allow-Credentials", "true");
  }
  /* ------------- 处理预检请求 ------------- */

  if (req.method === "OPTIONS") {
    // 从 Request 字段读取，写入 Allow 字段
    res.header(
      "Access-Control-Allow-Methods",
      req.headers["access-control-request-method"]
    );
    res.header(
      "Access-Control-Allow-Headers",
      req.headers["access-control-request-headers"]
    );
    res.header("Access-Control-Max-Age", 86400);

    // 预检请求直接返回，不再执行后续业务逻辑
    // return res.status(204).send();
  }

  next();
};
