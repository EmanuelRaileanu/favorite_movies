import express from 'express';
import * as controller from '../controllers/productionCompanies_controller';
import { asyncMiddleware } from '../utilities/asyncMiddleware';

export const register = (app: express.Application) => {
    app.get('/productionCompanies', asyncMiddleware(controller.getProductionCompanies));

    app.get('/productionCompanies/:id', asyncMiddleware(controller.getProductionCompanyById));

    app.post('/productionCompanies', asyncMiddleware(controller.postProductionCompany));

    app.delete('/productionCompanies/:id', asyncMiddleware(controller.deleteProductionCompany));
};