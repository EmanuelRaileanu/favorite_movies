import express from 'express';

export const loginMiddleware = (fn: any) =>
  async (req: express.Request, res: express.Response) => {
    //if(req.header.Authorization){
        try {
            await Promise.resolve(fn(req, res));
        }catch(err){
            res.status(500).json({
                status: err.toString()
            });
        }
    //}
    //else{
    //    res.json('You are not logged in!');
    //}
};