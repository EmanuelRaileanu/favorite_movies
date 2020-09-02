import express from 'express';
import schemas from '../utilities/validationSchemas';

export async function validateRegisterRequest(req: express.Request, res: express.Response, next: any){
    try{
        await schemas.userRegister.validateAsync(req.body);
        next();
    }catch(err){
        res.json(err);
    }
};

export async function validateLoginRequest(req: express.Request, res: express.Response, next: any){
    try{    
        await schemas.userLogin.validateAsync(req.body);
        next();
    }catch(err){
        res.json(err);
    }
};