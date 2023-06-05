import IUserService from "./IUserService";
import UserRepository from "../../repositories/User/UserRepository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

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
        const token = jwt.sign({ email: user.email }, 'secretStringForJWT', { expiresIn: '1h' });
        return {
            tokenType: "Bearer",
            token: token,
            user: user
        };
    }

    register = async (email: string, password: string): Promise<any> => {
        const user = await this.userRepository.findByEmail(email);
        if (user) {
            throw new Error("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        return await this.userRepository.create(email, hashedPassword);
    }
}

export default UserService;