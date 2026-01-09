// errors.js
export class HttpError extends Error {
  constructor(public status, message) {
    super(message);
    this.status = status;
  }
}

// 预定义常用
export const ForbiddenError = (msg = "permission denied") =>
  new HttpError(403, msg);

export const UnauthorizedError = (msg = "unauthorized") =>
  new HttpError(401, msg);

export const BadRequestError = (msg) => new HttpError(400, msg);
