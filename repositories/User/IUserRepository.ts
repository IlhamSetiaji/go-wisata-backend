import { User } from "@prisma/client";

interface IUserRepository {
    getAllUsers(): Promise<User[]>;
}

export default IUserRepository;