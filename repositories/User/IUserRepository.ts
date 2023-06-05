import { User } from "@prisma/client";

interface IUserRepository {
    getAllUsers(): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
    create(email: string, password: string): Promise<User>;
}

export default IUserRepository;