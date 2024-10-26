import express from 'express';
import { registerUser } from '../controllers/auth.controller';

const router = express.Router();

// router.get('')
router.post('/register', registerUser);

export default router;
