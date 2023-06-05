import { Router } from "express";
import UserController from "../controllers/UserController";
import multer from "multer";
const upload = multer({ dest: 'uploads/' });
import { authMiddleware } from "../middlewares/AuthMiddleware";

const router = Router();

router.use(authMiddleware);
router.get('/', UserController.getAllUsers);

export default router;