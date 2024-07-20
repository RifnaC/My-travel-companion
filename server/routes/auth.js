import express from 'express';
import router from express.Router();
import authController from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware';

router.post('/register', authController.register);
router.get('/verify/:token', authController.verifyEmail);
router.post('/login', authController.login);
router.get('/protected', authMiddleware, authController.protected);

module.exports = router;
