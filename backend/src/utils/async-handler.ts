import { NextFunction, Request, RequestHandler, Response } from 'express';

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown> | unknown;

export function asyncHandler(handler: AsyncRequestHandler): RequestHandler {
  return function asyncExpressHandler(req: Request, res: Response, next: NextFunction) {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}
