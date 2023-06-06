import IUserService from "./IUserService";
import UserRepository from "../../repositories/User/UserRepository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import transporter from "../../config/NodeMailer";
import { RegisterUserRequest } from "../../requests/User/RegisterUserRequest";
import { User } from "@prisma/client";

class UserService implements IUserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    getAllUsers = async (): Promise<any> => {
        return await this.userRepository.getAllUsers();
    }

    login = async (email: string, password: string): Promise<any> => {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new Error("Password is incorrect");
        }
        const token = jwt.sign({ email: user.email }, 'secretStringForJWT', { expiresIn: '1d' });
        return {
            tokenType: "Bearer",
            token: token,
            user: user
        };
    }

    register = async (payload: RegisterUserRequest): Promise<any> => {
        const user = await this.userRepository.findByEmail(payload.email);
        if (user) {
            throw new Error("User already exists");
        }
        payload.parentId = payload.parentId ? payload.parentId : 1;
        payload.password = await bcrypt.hash(payload.password, 10);
        const createdUser = await this.userRepository.create(payload);
        const token = await this.generateVerificationToken(payload.email);
        setTimeout(async () => {
            await this.sendEmailVerification(payload.email, token);
        }, 1000);
        return createdUser;
    }

    generateVerificationToken = async (email: string): Promise<any> => {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        const token = crypto.randomBytes(64).toString('hex');
        await this.userRepository.insertVerificationToken(user.email, token);
        return token;
    }

    sendEmailVerification = async (email: string, token: string): Promise<any> => {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        const mailOptions = {
            from: "ilham.ahmadz18@gmail.com",
            to: user.email,
            subject: "Email Verification",
            html: `<p>Click <a href="http://localhost:3000/api/verify-email?email=${user.email}&token=${token}">here</a> to verify your email</p>
            <p>Or copy this link to your browser: http://localhost:3000/api/verify-email?email=${user.email}&token=${token}</p>`
        };
        await transporter.sendMail(mailOptions);
        return true;
    }

    verifyEmail = async (email: string, token: string): Promise<User> => {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        const emailVerifyToken = await this.userRepository.checkEmailVerificationToken(email, token);
        if (!emailVerifyToken) {
            throw new Error("Token is invalid or expired");
        }
        await this.userRepository.verifyEmail(email);
        await this.userRepository.removeVerificationToken(token);
        return user;
    }

    resendEmailVerification = async (email: string): Promise<User> => {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        const token = await this.generateVerificationToken(email);
        setTimeout(async () => {
            await this.sendEmailVerification(email, token);
        }, 1000);
        return user;
    }

    generateResetPasswordToken = async (email: string): Promise<any> => {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        const token = crypto.randomBytes(64).toString('hex');
        await this.userRepository.insertResetPasswordToken(user.email, token);
        return token;
    }

    sendResetPasswordLink = async (email: string): Promise<any> => {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        const token = await this.generateResetPasswordToken(email);
        const mailOptions = {
            from: "ilham.ahmadz18@gmail.com",
            to: user.email,
            subject: "Reset Password",
            html: `<p>Click <a href="http://localhost:3000/api/reset-password?email=${user.email}&token=${token}">here</a> to reset your password</p>
            <p>Or copy this link to your browser: http://localhost:3000/api/reset-password?email=${user.email}&token=${token}</p>`
        };
        await transporter.sendMail(mailOptions);
        return user;
    }

    resetPassword = async (email: string, token: string, password: string): Promise<any> => {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        const passwordResetToken = await this.userRepository.checkResetPasswordToken(email, token);
        if (!passwordResetToken) {
            throw new Error("Token is invalid or expired");
        }
        password = await bcrypt.hash(password, 10);
        await this.userRepository.resetPassword(email, password);
        await this.userRepository.removeResetPasswordToken(token);
        return user;
    }
}

export default UserService;