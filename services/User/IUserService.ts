import { User } from "@prisma/client";
import { RegisterUserRequest } from "../../requests/User/RegisterUserRequest";

interface IUserService {
    getAllUsers(): Promise<any>;
    login(email: string, password: string): Promise<any>;
    register(payload: RegisterUserRequest): Promise<any>;
    generateVerificationToken(email: string): Promise<any>;
    sendEmailVerification(email: string, token: string): Promise<any>;
    verifyEmail(email: string, token: string): Promise<User>;
    resendEmailVerification(email: string): Promise<User>;
}

export default IUserService;