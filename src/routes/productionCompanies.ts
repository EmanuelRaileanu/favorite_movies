import express from 'express';
import * as controller from '../controllers/productionCompanies_controller';
import asyncMiddleware from '../utilities/asyncMiddleware';

export const register = (router: express.Router) => {
    router.get('/production-companies', asyncMiddleware(controller.getProductionCompanies));
    router.get('/production-companies/:id', asyncMiddleware(controller.getProductionCompanyById));
    router.post('/production-companies', asyncMiddleware(controller.postProductionCompany));
    router.put('/production-companies/:id', asyncMiddleware(controller.updateProductionCompany));
    router.delete('/production-companies/:id', asyncMiddleware(controller.deleteProductionCompany));
};