export const errorMiddleWare = (err, req, res, next) => {
  console.log("error middleware");
  // 可以在这里发送错误响应，或继续调用 next(err) 传递给下一个错误处理程序
  const errObj = {
    code: 500,
    msg: err instanceof Error ? err.message : err,
  };
  if (err) {
    res.status(500).send(errObj);
  } else {
    next();
  }
};
