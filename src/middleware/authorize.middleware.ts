import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CoreError, throwAPIError } from '../util/error-handler';

const authorizeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return throwAPIError({
      res,
      error: new CoreError('Unauthorized'),
      statusCode: 401,
    });
  }
  const token = authorization.split('Bearer ')[1];
  if (!token) {
    return throwAPIError({
      res,
      error: new CoreError('Authorization token not found'),
      statusCode: 401,
    });
  }

  try {
    const _decoded = jwt.verify(token, process.env.JWT_SECRET!);

    return next();
  } catch {
    throwAPIError({
      res,
      error: new CoreError('Forbidden access'),
      statusCode: 403,
    });
  }
};

export default authorizeMiddleware;
