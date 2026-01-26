import express from 'express';
import { index,store,show,update,destroy,edit,create } from '../app/controllers/PostsController.js';
const posts = express.Router();
import authenticated from '../app/middlewares/auth.js';

posts.get('/',index);
posts.post('/',store);
posts.get('/create',authenticated, create);
posts.get('/:id',show);
posts.post('/:id/update',authenticated, update);
posts.get('/:id/edit',authenticated, edit);
posts.post('/:id/delete',authenticated,destroy);


export default posts;