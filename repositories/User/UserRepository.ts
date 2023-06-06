import { RegisterUserRequest } from "../../requests/User/RegisterUserRequest";
import IUserRepository from "./IUserRepository";
import { EmailVerifyToken, PasswordResetToken, PrismaClient, User } from "@prisma/client";

class UserRepository implements IUserRepository {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }

    getAllUsers = async (): Promise<User[]> => {
        return await this.prisma.user.findMany({
            include: {
                UserRole: true,
            },
        });
    };

    findByEmail = async (email: string): Promise<User> => {
        return (await this.prisma.user.findUnique({
            where: {
                email: email,
            },
        })) as User;
    };

    create = async (payload: RegisterUserRequest): Promise<User> => {
        return await this.prisma.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: payload.password,
                phone: payload.phone,
                gender: payload.gender,
                city: payload.city,
                parentId: payload.parentId ? payload.parentId : null,
                UserRole: {
                    create: {
                        roleId: 3,
                    },
                },
            },
            include: {
                UserRole: true,
            },
        });
    };

    checkEmailVerificationToken = async (
        email: string,
        token: string
    ): Promise<EmailVerifyToken> => {
        return (await this.prisma.emailVerifyToken.findFirst({
            where: {
                email: email,
                token: token,
                expiredAt: {
                    gte: new Date().toISOString(),
                },
            },
        })) as EmailVerifyToken;
    };

    insertVerificationToken = async (
        email: string,
        token: string
    ): Promise<EmailVerifyToken> => {
        return await this.prisma.emailVerifyToken.create({
            data: {
                token: token,
                email: email,
                expiredAt: new Date(
                    Date.now() + 24 * 60 * 60 * 1000
                ).toISOString(),
            },
        });
    };

    verifyEmail = async (email: string): Promise<User> => {
        return await this.prisma.user.update({
            where: {
                email: email,
            },
            data: {
                emailVerifiedAt: new Date().toISOString(),
            },
        });
    };

    removeVerificationToken = async (token: string): Promise<EmailVerifyToken> => {
        return await this.prisma.emailVerifyToken.delete({
            where: {
                token: token,
            },
        });
    };

    insertResetPasswordToken = async (
        email: string,
        token: string
    ): Promise<PasswordResetToken> => {
        return await this.prisma.passwordResetToken.create({
            data: {
                token: token,
                email: email,
                expiredAt: new Date(
                    Date.now() + 24 * 60 * 60 * 1000
                ).toISOString(),
            },
        });
    };

    checkResetPasswordToken = async (
        email: string,
        token: string
    ): Promise<PasswordResetToken> => {
        return (await this.prisma.passwordResetToken.findFirst({
            where: {
                email: email,
                token: token,
                expiredAt: {
                    gte: new Date().toISOString(),
                },
            },
        })) as PasswordResetToken;
    };

    resetPassword = async (email: string, password: string): Promise<User> => {
        return await this.prisma.user.update({
            where: {
                email: email,
            },
            data: {
                password: password,
            },
        });
    }

    removeResetPasswordToken = async (token: string): Promise<PasswordResetToken> => {
        return await this.prisma.passwordResetToken.delete({
            where: {
                token: token,
            },
        });
    }
}

export default UserRepository;
