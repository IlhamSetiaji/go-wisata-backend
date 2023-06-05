import IUserRepository from "./IUserRepository";
import { PrismaClient, User } from "@prisma/client";

class UserRepository implements IUserRepository {
    private prisma: PrismaClient;
    constructor() { 
        this.prisma = new PrismaClient();
    }

    getAllUsers = async (): Promise<User[]> => {
        return await this.prisma.user.findMany({
            include: {
                UserRole: true
            }
        });
    }

    findByEmail = async (email: string): Promise<User> => {
        return await this.prisma.user.findUnique({
            where: {
                email: email
            }
        }) as User;
    }

    create = async (email: string, password: string): Promise<User> => {
        return await this.prisma.user.create({
            data: {
                email: email,
                password: password
            }
        });
    }
}

export default UserRepository;