import UserRepository from "../../repositories/User/UserRepository";

interface IUserService {
    getAllUsers(): Promise<any>;
    login(email: string, password: string): Promise<any>;
    register(email: string, password: string): Promise<any>;
}

export default IUserService;