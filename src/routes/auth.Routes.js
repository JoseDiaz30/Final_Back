import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controllers.js';

const router = Router();

// Ruta: /api/auth/register
router.post('/register', registerUser);

// Ruta: /api/auth/login
router.post('/login', loginUser);

export default router;