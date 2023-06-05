import { Request, Response } from "express";
import UserService from "../services/User/UserService";
import ResponseFormatter from "../helpers/ResponseFormatter";

class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    login = async (req: Request, res: Response): Promise<any> => {
        try {
            const { email, password } = req.body;
            const token = await this.userService.login(email, password);
            return ResponseFormatter.success(res, token);
        } catch (error: any) {
            return ResponseFormatter.error(res, error.message);
        }
    };

    register = async (req: Request, res: Response): Promise<any> => {
        try {
            const { email, password } = req.body;
            const user = await this.userService.register(email, password);
            return ResponseFormatter.success(res, user);
        } catch (error: any) {
            return ResponseFormatter.error(res, error.message);
        }
    };

    getAllUsers = async (req: Request, res: Response): Promise<any> => {
        try {
            const users = await this.userService.getAllUsers();
            return ResponseFormatter.success(res, users);
        } catch (error: any) {
            return ResponseFormatter.error(res, error.message);
        }
    };
}

export default new UserController();
