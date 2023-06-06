import { EmailVerifyToken, User } from "@prisma/client";
import { RegisterUserRequest } from "../../requests/User/RegisterUserRequest";

interface IUserRepository {
    getAllUsers(): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
    create(payload: RegisterUserRequest): Promise<User>;
    checkEmailVerificationToken(email: string, token: string): Promise<EmailVerifyToken>;
    insertVerificationToken(email: string, token: string): Promise<EmailVerifyToken>;
    verifyEmail(email: string): Promise<User>;
}

export default IUserRepository;