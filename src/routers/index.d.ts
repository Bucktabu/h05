import {UsersDBType} from "../types/user-type";

declare global {
    declare namespace Express {
        export interface  Request {
            user: UsersDBType | null
        }
    }
} // расширение типов