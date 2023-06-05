import IUserService from "./IUserService";
import UserRepository from "../../repositories/User/UserRepository";

class UserService implements IUserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    getAllUsers = async (): Promise<any> => {
        return await this.userRepository.getAllUsers();
    }
}

export default UserService;