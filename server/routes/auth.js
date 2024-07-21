import express from 'express';
const router = express.Router();
import { home, login, register, verifyEmail } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

router.post('/register', register);
router.get('/verify', verifyEmail);
router.post('/login', login);
router.get('/protected', authMiddleware, home);

export default router;
