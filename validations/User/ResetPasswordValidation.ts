import { body, validationResult } from "express-validator";
import ResponseFormatter from "../../helpers/ResponseFormatter";
import { Request, Response, NextFunction } from "express";

const ResetPasswordValidation = [
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isString()
        .withMessage("Password must be string")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters")
        .escape(),
    body("password_confirmation")
        .notEmpty()
        .withMessage("Password confirmation is required")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error(
                    "Password confirmation does not match password"
                );
            }
            return true;
        }
    ),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return ResponseFormatter.badRequest(res, errors.array());
        }
        next();
    }
];

export default ResetPasswordValidation;