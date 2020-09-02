import express from 'express';

const asyncMiddleware = (fn: any) =>
  async (req: express.Request, res: express.Response, next: any) => {
    try {
        await Promise.resolve(fn(req, res));
    }catch(err){
        next(err);
    }
};

export default asyncMiddleware;