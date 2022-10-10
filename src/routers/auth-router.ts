import {Request, Response, Router} from "express";
import {usersService} from "../domain/users-service";
import {authRouterValidationMiddleware} from "../middlewares/authRouter-validation-middleware";

export const authRouter = Router({})

authRouter.post('/',
    ...authRouterValidationMiddleware,
    async (req: Request, res: Response) => {
    const checkResult = await usersService.checkCredential(req.body.loginOrEmail, req.body.password)
})