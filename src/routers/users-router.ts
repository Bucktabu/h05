import {Request, Response, Router} from "express";
import {authenticationGuardMiddleware} from "../middlewares/authentication-guard-middleware";
import {userRouterValidationMiddleware} from "../middlewares/userRouter-validation-middleware";
import {usersService} from "../domain/users-service";
import {contentPageType} from "../types/contentPage-type";

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

// usersRouter.get('/', async (req: Request, res: Response) => {
//     const pageWithUsers: contentPageType = await usersService
//         .giveUsersPage(req.query.sortBy?.toString(),
//                        req.query.sortDirection?.toString(),
//                        req.query.pageNumber?.toString(),
//                        req.query.pageSize?.toString(),
//                        req.query.searchLoginTerm?.toString(),
//                        req.query.searchEmailTerm?.toString())
//
//     if (!pageWithUsers) {
//         return res.sendStatus(404)
//     }
//
//     res.status(200).send(pageWithUsers)
// })