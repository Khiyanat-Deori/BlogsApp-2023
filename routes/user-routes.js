import express from 'express';
import { getAllUser, signup, login, getUserById } from '../controllers/user-controller.js';

const router = express.Router();

router.get("/",getAllUser);
router.get("/:userId", getUserById);
router.post("/signup", signup);
router.post("/login", login);
export default router;