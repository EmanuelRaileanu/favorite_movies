import express from 'express';
import * as controller from '../controllers/productionCompanies_controller'

export const register = (app: express.Application) => {

    app.get('/productionCompanies', (req, res) => {
        controller.getProductionCompanies(req, res);
    });

    app.get('/productionCompanies/:id', (req, res) => {
        controller.getProductionCompanyById(req, res);
    });

    app.post('/productionCompanies', (req, res) => {
        controller.postProductionCompany(req, res);
    });

    app.delete('/productionCompanies/:id', (req, res) => {
        controller.deleteProductionCompany(req, res);
    });

};