import { body, validationResult } from "express-validator";
import ResponseFormatter from "../../helpers/ResponseFormatter";
import { Request, Response, NextFunction } from "express";

const StoreUserValidation = [
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isString()
        .withMessage("Name must be string")
        .trim()
        .escape(),
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be email")
        .trim()
        .escape(),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isString()
        .withMessage("Password must be string")
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
        }),
    body("phone")
        .notEmpty()
        .withMessage("Phone is required"),
    body("gender")
        .notEmpty()
        .withMessage("gender is required")
        .matches(/^(MALE|FEMALE)$/)
        .withMessage("gender is not match"),
    body("city")
        .notEmpty()
        .withMessage("City is required")
        .isString()
        .withMessage("City must be string"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return ResponseFormatter.badRequest(res, errors.array());
        }
        next();
    }
];

export default StoreUserValidation;
