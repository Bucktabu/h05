import {body} from "express-validator";
import {inputValidationMiddleware} from "./input-validation-middleware";

const loginValidation = body('login').isString().trim().isLength({min: 3, max: 10})
const passwordValidation = body('password').isString().trim().isLength({min: 6, max: 20})
const emailValidation = body('mail').isString().trim().isEmail()

export const userRouterValidationMiddleware = [loginValidation, passwordValidation, emailValidation, inputValidationMiddleware]