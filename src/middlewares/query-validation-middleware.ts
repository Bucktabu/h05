import {NextFunction, Request, Response} from "express";
import {SortDirection, SortParameters} from "../models/sortParameters";
import {URIParameters} from "../models/URIParameters";
import {RequestWithParamsAndQuery} from "../types/request-types";
import {QueryParameters} from "../models/queryParameters";

const sortByValidation = (req: RequestWithParamsAndQuery<URIParameters, QueryParameters>,
                          res: Response,
                          next: NextFunction) => {

    const sortParameters = Object.values(SortParameters)
    const sortBy = req.query.sortBy

    if (!sortBy) {
        req.query.sortBy = SortParameters.CreatedAt // 'createdAt'
    }

    if (!sortParameters.includes(sortBy as SortParameters)) {
        req.query.sortBy = SortParameters.CreatedAt
    }

    next()
}

const sortDirectionValidation = (req: RequestWithParamsAndQuery<URIParameters, QueryParameters>,
                                 res: Response,
                                 next: NextFunction) => {

    const sortDirections = Object.values(SortDirection)
    const sortDirection = req.query.sortDirection

    if (!sortDirection) {
        req.query.sortDirection = SortDirection.Distending
    }

    if (!sortDirections.includes(sortDirection as SortDirection)) {
        req.query.sortDirection = SortDirection.Distending
    }

    next()
}

const pageNumberValidation = (req: Request<{}, {}, {}, {pageNumber: string}>,
                              res: Response, next: NextFunction) => {

    const pageNumber = req.query.pageNumber

    if (!pageNumber) {
        req.query.pageNumber = '1'
    }

    if (isNaN(Number(pageNumber))) {
        req.query.pageNumber = '1'
    }

    if (Number(pageNumber) < 0) {
        req.query.pageNumber = '1'
    }

    next()
}

const pageSizeValidation = (req: Request<{}, {}, {}, {pageSize: string}>,
                            res: Response, next: NextFunction) => {

    const pageSize = req.query.pageSize

    if (!pageSize) {
        req.query.pageSize = '10'
    }

    if (isNaN(Number(pageSize))) {
        req.query.pageSize = '10'
    }

    if (Number(pageSize) < 0) {
        req.query.pageSize = '10'
    }

    next()
}

const searchNameTermValidation = ((req: Request<{}, {}, {}, {searchNameTerm: string}>,
                                   res: Response, next: NextFunction) => {

    if (!req.query.searchNameTerm) {
        req.query.searchNameTerm = ''
    }

    req.query.searchNameTerm = req.query.searchNameTerm.trim()

    next()
})

const searchLoginTermValidation = ((req: Request<{}, {}, {}, {searchLoginTerm: string}>,
                                    res: Response, next: NextFunction) => {

    if (!req.query.searchLoginTerm) {
        req.query.searchLoginTerm = ''
    }

    req.query.searchLoginTerm = req.query.searchLoginTerm.trim()

    next()
})

const searchEmailTermValidation = ((req: Request<{}, {}, {}, {searchEmailTerm: string}>,
                                   res: Response, next: NextFunction) => {

    if (!req.query.searchEmailTerm) {
        req.query.searchEmailTerm = ''
    }

    req.query.searchEmailTerm = req.query.searchEmailTerm.trim()

    next()
})

export const queryValidationMiddleware = [sortByValidation, sortDirectionValidation, pageNumberValidation, pageSizeValidation]
export const queryWithNameTermValidation = [sortByValidation, sortDirectionValidation, pageNumberValidation, pageSizeValidation, searchNameTermValidation]
export const usersQueryValidationMiddleware = [sortByValidation, sortDirectionValidation, pageNumberValidation, pageSizeValidation, searchEmailTermValidation, searchLoginTermValidation]