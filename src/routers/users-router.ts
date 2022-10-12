import {Request, Response, Router} from "express";

import {authenticationGuardMiddleware} from "../middlewares/authentication-guard-middleware";
import {userRouterValidationMiddleware} from "../middlewares/userRouter-validation-middleware";
import {usersQueryValidationMiddleware} from "../middlewares/query-validation-middleware";

import {usersService} from "../domain/user-service";

import {QueryParams} from "../models/queryParams";
import {URIParams} from "../models/URIParams";

import {ContentPageType} from "../types/content-page-type";
import {RequestWithParams, RequestWithQuery} from "../types/request-types";


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

usersRouter.delete('/:id',
    authenticationGuardMiddleware,
    async (req: RequestWithParams<URIParams>, res: Response) => {

        const isDeleted = await usersService.deleteUserById(req.params.id)

        if (!isDeleted) {
            return res.sendStatus(404)
        }

        res.status(204)
    }
)