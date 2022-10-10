import {usersRepository} from "../repositories/users-repository";
import {userType} from "../types/users-type";
import bcrypt from 'bcrypt'
import {ObjectId} from "mongodb";
import {contentPageType} from "../types/contentPage-type";
import {paginationContentPage} from "../paginationContentPage";

export const usersService = {
    async createNewUser(login: string, password: string, email: string): Promise<userType> {
        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const newUser: userType = {
            id: String(+new Date()),
            login,
            email,
            passwordHash,
            passwordSalt,
            createdAt: new Date().toISOString()
        }

        await usersRepository.createNewUser({...newUser})
        return newUser
    },

    // async giveUsersPage(sortBy?: string,
    //                     sortDirection?: string,
    //                     pageNumber?: string,
    //                     pageSize?: string,
    //                     searchLoginTerm?: string,
    //                     searchEmailTerm?: string): Promise<contentPageType> {
    //     const content = await usersRepository.giveUsers(sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm)
    //
    //     return paginationContentPage(sortBy, sortDirection, pageNumber, pageSize, content)
    // },

    // async checkCredential(loginOrEmail: string, password: string): Promise<boolean> {
    //     const user: userType = await usersRepository.findUserByLoginOrEmail(loginOrEmail)
    //
    //     if (!user) {
    //         return false
    //     }
    //
    //     const passwordHash = await this._generateHash(password, user.passwordSalt)
    //
    //     if (user.passwordHash !== passwordHash) {
    //         return false
    //     }
    //
    //     return true
    // },

    async _generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash
    }
}