import { EmailVerifyToken, PasswordResetToken, User } from "@prisma/client";
import { RegisterUserRequest } from "../../requests/User/RegisterUserRequest";

interface IUserRepository {
    getAllUsers(): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
    create(payload: RegisterUserRequest): Promise<User>;
    checkEmailVerificationToken(email: string, token: string): Promise<EmailVerifyToken>;
    insertVerificationToken(email: string, token: string): Promise<EmailVerifyToken>;
    verifyEmail(email: string): Promise<User>;
    removeVerificationToken(email: string): Promise<EmailVerifyToken>;
    insertResetPasswordToken(email: string, token: string): Promise<PasswordResetToken>;
    checkResetPasswordToken(email: string, token: string): Promise<PasswordResetToken>;
    resetPassword(email: string, password: string): Promise<User>;
    removeResetPasswordToken(email: string): Promise<PasswordResetToken>;
}

export default IUserRepository;