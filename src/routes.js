import express from 'express';
import * as Controller from './controllers.js';
import * as middlewares from './middlewares.js'

const router = express.Router();

router.get('/', Controller.getPosts);

router.get('/update/:postId', Controller.getUpdatePost);

router.post('/update', Controller.postUpdatePost);
router.post('/delete', Controller.postDeletePost);


router.get('/create', Controller.getCreatePost);
router.post('/create',middlewares.validateCreatePost,middlewares.checkDuplicatePost,Controller.postCreatePost);


export default router;
