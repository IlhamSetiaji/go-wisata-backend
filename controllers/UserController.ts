import { Request, Response } from "express";
import UserService from "../services/User/UserService";
import ResponseFormatter from "../helpers/ResponseFormatter";
import { RegisterUserRequest } from "../requests/User/RegisterUserRequest";

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
            const payload: RegisterUserRequest = req.body;
            const user = await this.userService.register(payload);
            return ResponseFormatter.success(res, user);
        } catch (error: any) {
            return ResponseFormatter.error(res, error.message);
        }
    };

    verifyEmail = async (req: Request, res: Response): Promise<any> => {
        try {
            const { email, token } = req.query;
            const user = await this.userService.verifyEmail(email as string, token as string);
            return ResponseFormatter.success(res, user);
        } catch (error: any) {
            return ResponseFormatter.error(res, error.message);
        }
    };

    resendEmailVerification = async (req: Request, res: Response): Promise<any> => {
        try {
            const { email } = req.query;
            const user = await this.userService.resendEmailVerification(email as string);
            return ResponseFormatter.success(res, user, "Email verification sent");
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
