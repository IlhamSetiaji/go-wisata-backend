import { Router } from "express";
import user from "./user";
import UserController from "../controllers/UserController";
import multer from "multer";
const upload = multer({ dest: 'uploads/' });

const router = Router();

router.get('/', UserController.getAllUsers);
router.post('/login', upload.any(), UserController.login);

router.use('/users', user);

export default router;