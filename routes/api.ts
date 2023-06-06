import { Router } from "express";
import user from "./user";
import UserController from "../controllers/UserController";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
import StoreUserValidation from "../validations/User/StoreUserValidation";
import ForgotPasswordValidation from "../validations/User/ForgotPasswordValidation";
import ResetPasswordValidation from "../validations/User/ResetPasswordValidation";

const router = Router();

router.get("/", UserController.getAllUsers);
router.post("/login", upload.any(), UserController.login);
router.post(
    "/register",
    upload.any(),
    StoreUserValidation,
    UserController.register
);
router.get(
    "/resend-email-verification",
    UserController.resendEmailVerification
);
router.get("/verify-email", UserController.verifyEmail);
router.post(
    "/forgot-password",
    upload.any(),
    ForgotPasswordValidation,
    UserController.sendResetPasswordLink
);
router.post(
    "/reset-password",
    upload.any(),
    ResetPasswordValidation,
    UserController.resetPassword
);

router.use("/users", user);

export default router;
