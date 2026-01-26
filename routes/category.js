import express from 'express';
import { index,store,show,update,destroy,edit,create } from '../app/controllers/CategoryController.js';
const category = express.Router();

category.get('/',index);
category.post('/',store);
category.get('/create',create);
category.put('/:id/update',update);
category.get('/:id/edit',edit);
category.delete('/:id/delete',destroy);


export default category;