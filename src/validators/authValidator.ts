import express from 'express';
import schemas from '../utilities/validationSchemas';

export async function validateRegisterRequest(req: express.Request){
    await schemas.userRegister.validateAsync(req.body);
};

export async function validateLoginRequest(req: express.Request){
    await schemas.userLogin.validateAsync(req.body);
};