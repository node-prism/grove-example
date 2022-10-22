import { NextFunction, Request, Response } from "express";

export default [
  // Handle errors by sending a 500 with the error message.
  (err: any, _req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(err);
    }

    if (err instanceof Error) {
      return res.status(500).send({ code: 500, error: String(err.message) });
    }

    return next(err);
  },

  // 404 handler
  (req: Request, res: Response, _next: NextFunction) => {
    res.render("404", { path: req.path });
  },
];
