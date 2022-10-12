import {Request, Response, Router} from "express";
import {usersService} from "../domain/user-service";

export const authRouter = Router({})

authRouter.post('/', async (req: Request, res: Response) => {
        const checkResult = await usersService.checkCredential(req.body.loginOrEmail, req.body.password)
    })