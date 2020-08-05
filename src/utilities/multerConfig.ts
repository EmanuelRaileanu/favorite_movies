import express from 'express';
import multer from 'multer';
import { sha256 } from '../utilities/sha256';

const storage = multer.diskStorage({
    destination: (req: express.Request, file: any, cb: any) => {
        cb(null, './public/uploads/');
    },
    filename: (req: express.Request, file: any, cb: any) => {
        const extensionDotIndex = file.originalname.lastIndexOf('.');
        const extension = file.originalname.substring(extensionDotIndex);
        cb(null, sha256(file.originalname.substring(0, extensionDotIndex)) + extension);
    },
});

export const upload = multer({storage});