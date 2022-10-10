import {body} from "express-validator";
import {inputValidationMiddleware} from "./input-validation-middleware";

const loginOrEmailValidation = body('loginOrEmail').isString()
const passwordValidation = body('password').isString()

export const authRouterValidationMiddleware = [loginOrEmailValidation, passwordValidation, inputValidationMiddleware]