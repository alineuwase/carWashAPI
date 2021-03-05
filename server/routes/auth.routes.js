import Router from 'express';
import userController from '../components/auth.controller';

const routes = Router();

routes.post('/register', userController.signUp);
routes.post('/login', userController.signIn);

export default routes;
