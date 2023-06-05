import { Request, Response } from "express";
import UserService from "../services/User/UserService";
import ResponseFormatter from "../helpers/ResponseFormatter";

class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    getAllUsers = async (req: Request, res: Response): Promise<any> => {
        try {
            const users = await this.userService.getAllUsers();
            return ResponseFormatter.success(res, users);
        } catch (error: any) {
            return ResponseFormatter.error(res, error);
        }
    };
}

export default new UserController();
