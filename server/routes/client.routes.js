import Router from 'express';
import clientController from '../components/client.controller';

const routes = Router();

routes.post('/booking', clientController.booking);
routes.get('/service', clientController.getServices);
routes.post('/pay', clientController.payService);
routes.post('/checkpay', clientController.checkPayment);

export default routes;