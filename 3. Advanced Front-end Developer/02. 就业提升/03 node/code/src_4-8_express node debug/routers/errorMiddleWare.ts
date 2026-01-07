import { HttpError } from "../utils/errors";

export const errorMiddleWare = (err, req, res, next) => {
  console.log("error middleware");

  // 可以在这里发送错误响应，或继续调用 next(err) 传递给下一个错误处理程序

  let status = 500;
  let message = "internal server error";

  /* -------- 2. 捕获 HttpError -------- */
  if (err instanceof HttpError) {
    status = err.status;
    message = err.message;
  }

  /* -------- 3. 其他未知 -------- */
  const errObj = {
    code: status,
    msg: err instanceof Error ? err.message : err,
  };

  console.log(errObj);

  if (err) {
    res.status(status).send(errObj);
  } else {
    next(err);
  }
};
