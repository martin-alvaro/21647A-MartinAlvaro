// Importacion de modulos y definicion de rutas
import express from 'express';
import * as Controller from './controllers.js';
import * as middlewares from './middlewares.js'

const router = express.Router();

// Definicion de rutas y asociacion con controladores
router.get('/', Controller.getPosts);
router.get('/update/:postId', Controller.getUpdatePost);
router.post('/update', Controller.postUpdatePost);
router.post('/delete', Controller.postDeletePost);
router.get('/create', Controller.getCreatePost);
router.post('/create',middlewares.validateCreatePost,middlewares.checkDuplicatePost,Controller.postCreatePost);

// Exportacion del enrutador
export default router;
