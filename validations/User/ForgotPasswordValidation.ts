import { body, validationResult } from "express-validator";
import ResponseFormatter from "../../helpers/ResponseFormatter";
import { Request, Response, NextFunction } from "express";

const ForgotPasswordValidation = [
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be email")
        .trim()
        .escape(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return ResponseFormatter.badRequest(res, errors.array());
        }
        next();
    }
];

export default ForgotPasswordValidation;