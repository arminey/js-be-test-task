import * as express from 'express';

export const contentType = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader('Content-Type', 'application/json');
    next();
}