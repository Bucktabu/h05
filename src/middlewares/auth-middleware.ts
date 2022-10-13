// import {NextFunction, Request, Response} from "express";
// import {jwsService} from "../application/jws-service";
// import {usersService} from "../domain/user-service";
//
// export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//     if (!req.headers.authorization) {
//         res.sendStatus(401)
//         return
//     }
//
//     const token = req.headers.authorization.split(' ')[1]
//
//     const userId = await jwsService.getUserIdByToken(token)
//
//     if (!userId) {
//         return res.sendStatus(401)
//     }
//
//     req.user = await usersService.giveUserById(userId)
//     next()
// }