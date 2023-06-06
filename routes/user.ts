import { Router } from "express";
import UserController from "../controllers/UserController";
import multer from "multer";
const upload = multer({ dest: 'uploads/' });
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { emailVerifiedMiddleware } from "../middlewares/EmailVerifiedMiddleware";

const router = Router();

router.use(authMiddleware);
router.use(emailVerifiedMiddleware);
router.get('/', UserController.getAllUsers);

export default router;