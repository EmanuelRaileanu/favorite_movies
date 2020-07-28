import express from 'express';
import * as controller from '../controllers/productionCompanies_controller'

export const register = (app: express.Application) => {
    app.get('/productionCompanies', controller.getProductionCompanies);

    app.get('/productionCompanies/:id', controller.getProductionCompanyById);

    app.post('/productionCompanies', controller.postProductionCompany);

    app.delete('/productionCompanies/:id', controller.deleteProductionCompany);
};