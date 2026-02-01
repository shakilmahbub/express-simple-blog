import express from 'express';
import { index,login,registration,registerUser, authenticateUser,logout } from '../app/controllers/DashboardController.js';
const dashboard = express.Router();
import authenticated from '../app/middlewares/auth.js';

dashboard.get('/dashboard',authenticated,index);
dashboard.get('/login',login);
dashboard.post('/login',authenticateUser);
dashboard.get('/registration',registration);
dashboard.post('/registration',registerUser);
dashboard.get('/logout',logout);

export default dashboard;