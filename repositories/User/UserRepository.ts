import IUserRepository from "./IUserRepository";
import { PrismaClient, User } from "@prisma/client";

class UserRepository implements IUserRepository {
    private prisma: PrismaClient;
    constructor() { 
        this.prisma = new PrismaClient();
    }

    getAllUsers = async (): Promise<User[]> => {
        return await this.prisma.user.findMany();
    }
}

export default UserRepository;