import express from 'express';

export const register = (app: express.Application) => {
    app.get('*', (req, res) =>{
        res.status(404).send('Page not found');
    });
};