import {UserDBType} from "../types/user-type";

declare global {
    declare namespace Express {
        export interface  Request {
            user: UserDBType | null
        }
    }
} // расширение типов