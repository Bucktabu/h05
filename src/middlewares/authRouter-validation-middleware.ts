import {body} from "express-validator";
import {inputValidationMiddleware} from "./input-validation-middleware";

const loginValidation = body('login').isString().trim()
const passwordValidation = body('password').isString().trim()

export const authRouterValidationMiddleware = [loginValidation, passwordValidation, inputValidationMiddleware]