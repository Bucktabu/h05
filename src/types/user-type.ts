import {WithId} from "mongodb";

export type UserType = {
    id: string,
    login: string,
    email: string,
    createdAt: string
}

export type UsersType = UserType[]

export type UserDBType = WithId<{
    id: string,
    login: string,
    email: string,
    passwordHash: string,
    passwordSalt: string,
    createdAt: string
}>


export type UsersDBType = UserDBType[]


export const usersDBtoUserType = (userDB: UserDBType) => {
    return {
        id: userDB.id,
        login: userDB.login,
        email: userDB.email,
        createdAt: userDB.createdAt
    }
}