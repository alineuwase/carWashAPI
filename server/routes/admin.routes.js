import Router from 'express';
import adminController from '../components/admin.controller';

const routes = Router();

routes.post('/service', adminController.addService);
routes.post('/report', adminController.addReport);
routes.post('/admin', adminController.addAdmin);
routes.get('/booking', adminController.bookings);
routes.get('/report', adminController.getReports);
routes.get('/users', adminController.getUsers);
routes.get('/books', adminController.booking);
routes.delete('/user', adminController.deleteUsers);
routes.delete('/report', adminController.deleteReport);
routes.delete('/service', adminController.deleteService);

export default routes;
