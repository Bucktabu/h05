import bcrypt from 'bcrypt'
import {usersRepository} from "../repositories/users-repository";
import {UserDBType, usersDBtoUserType, UsersDBType, UsersType, UserType} from "../types/user-type";
import {ContentPageType} from "../types/content-page-type";
import {paginationContentPage} from "../paginationContentPage";
import {ObjectId} from "mongodb";

export const usersService = {
    async createNewUser(login: string, password: string, email: string): Promise<UserType | null> {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const createNewUser: UserDBType = {
            _id: new ObjectId(),
            id: String(+new Date()),
            login,
            email,
            passwordHash,
            passwordSalt,
            createdAt: new Date().toISOString()
        }

        const createdNewUser = await usersRepository.createNewUser(createNewUser)
        if (!createdNewUser) return null

        return usersDBtoUserType(createNewUser)
    },

    // async giveUserById(userId: string): Promise<UserType | null> {
    //     return await usersRepository.giveUserById(userId)
    // },

    async giveUsersPage(sortBy: string,
                        sortDirection: string,
                        pageNumber: string,
                        pageSize: string,
                        searchLoginTerm: string,
                        searchEmailTerm: string): Promise<ContentPageType> {

        const contentDB = await usersRepository.giveUsers(sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm)
        // const content = contentDB.map(userDB => usersDBtoUserType(userDB))
        const totalCount = await usersRepository.giveTotalCount(searchLoginTerm, searchEmailTerm)

        return paginationContentPage(pageNumber, pageSize, contentDB, totalCount)
    },

    async deleteUserById(id: string): Promise<boolean> {
        return await usersRepository.deleteUserById(id)
    },

    async checkCredential(loginOrEmail: string, password: string): Promise<boolean> {
        const user: UserDBType | null = await usersRepository.findUserByLoginOrEmail(loginOrEmail)

        if (!user) {
            return false
        }

        const passwordHash = await this._generateHash(password, user.passwordSalt)

        if (user.passwordHash !== passwordHash) {
            return false
        }

        return true
    },

    async _generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash
    }
}