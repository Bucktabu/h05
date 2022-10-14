import {Request, Response, Router} from "express";
import {usersService} from "../domain/user-service";
import {authRouterValidationMiddleware} from "../middlewares/authRouter-validation-middleware";
import {jwsService} from "../application/jws-service";
import {RequestWithBody} from "../types/request-types";
import {UserTryLogIn} from "../models/userTryLogIn";

export const authRouter = Router({})

authRouter.post('/login',
    ...authRouterValidationMiddleware,
    async (req: Request, res: Response) => {
        const user = await usersService.checkCredential(req.body.login, req.body.password)

        if (!user) {
            return res.sendStatus(401)
        }

        //const token = await jwsService.createJWT(user)
        //res.status(201).send(token)
        return res.sendStatus(204)
    })