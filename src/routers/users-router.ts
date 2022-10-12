import {Request, Response, Router} from "express";
import {authenticationGuardMiddleware} from "../middlewares/authentication-guard-middleware";
import {userRouterValidationMiddleware} from "../middlewares/userRouter-validation-middleware";
import {usersService} from "../domain/user-service";
import {ContentPageType} from "../types/content-page-type";
import {queryValidationMiddleware, usersQueryValidationMiddleware} from "../middlewares/query-validation-middleware";
import {RequestWithQuery} from "../types/request-types";
import {QueryParams} from "../models/queryParams";

export const usersRouter = Router({})

usersRouter.post('/',
    authenticationGuardMiddleware,
    ...userRouterValidationMiddleware,
    async (req: Request, res: Response) => {
        const newUser = await usersService.createNewUser(req.body.login, req.body.password, req.body.email)

        if (!newUser) {
            return res.sendStatus(404)
        }

        res.status(201).send(newUser)
    })

usersRouter.get('/',
    ...usersQueryValidationMiddleware,
    async (req: RequestWithQuery<QueryParams>, res: Response) => {
    const pageWithUsers: ContentPageType = await usersService
        .giveUsersPage(req.query.sortBy,
                       req.query.sortDirection,
                       req.query.pageNumber,
                       req.query.pageSize,
                       req.query.searchLoginTerm,
                       req.query.searchEmailTerm)

    if (!pageWithUsers) {
        return res.sendStatus(404)
    }

    res.status(200).send(pageWithUsers)
})