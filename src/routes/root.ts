import express from 'express';

export const register = (app: express.Application) => {
    app.get('/', (req, res) =>{
        const response = {
            name: "Favorite Movies",
            version: process.env.npm_package_version
        };
        res.send(response);
    });
};

