import UserRepository from "../../repositories/User/UserRepository";

interface IUserService {
    getAllUsers(): Promise<any>;
}

export default IUserService;