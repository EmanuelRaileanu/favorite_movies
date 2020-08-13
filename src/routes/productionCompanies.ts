import express from 'express';
import * as controller from '../controllers/productionCompanies_controller';
import { asyncMiddleware } from '../utilities/asyncMiddleware';

export const register = (router: express.Router) => {
    router.get('/productionCompanies', asyncMiddleware(controller.getProductionCompanies));

    router.get('/productionCompanies/:id', asyncMiddleware(controller.getProductionCompanyById));

    router.post('/productionCompanies', asyncMiddleware(controller.postProductionCompany));

    router.delete('/productionCompanies/:id', asyncMiddleware(controller.deleteProductionCompany));
};