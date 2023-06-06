import { Router } from "express";
import user from "./user";
import UserController from "../controllers/UserController";
import multer from "multer";
const upload = multer({ dest: 'uploads/' });
import StoreUserValidation from "../validations/User/StoreUserValidation";

const router = Router();

router.get('/', UserController.getAllUsers);
router.post('/login', upload.any(), UserController.login);
router.post('/register', upload.any(), StoreUserValidation, UserController.register);

router.use('/users', user);

export default router;