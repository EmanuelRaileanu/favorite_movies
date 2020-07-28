import express from 'express';

export const getRoot = async (req: express.Request, res: express.Response) => {
    const response = {
        name: "Favorite Movies",
        version: process.env.npm_package_version
    };
    res.send(response);
};