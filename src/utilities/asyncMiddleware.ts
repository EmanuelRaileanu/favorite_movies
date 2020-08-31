import express from 'express';

const asyncMiddleware = (fn: any) =>
  async (req: express.Request, res: express.Response, next: any) => {
    try {
        await Promise.resolve(fn(req, res));
        next();
    }catch(err){
        res.status(500).json(err.toString());
    }
};

export default asyncMiddleware;