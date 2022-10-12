import bcrypt from 'bcrypt'
import {usersRepository} from "../repositories/users-repository";
import {UserType} from "../types/user-type";
import {ContentPageType} from "../types/content-page-type";
import {paginationContentPage} from "../paginationContentPage";

export const usersService = {
    async createNewUser(login: string, password: string, email: string): Promise<UserType> {
        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const newUser: UserType = {
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

    async giveUsersPage(sortBy: string,
                        sortDirection: string,
                        pageNumber: string,
                        pageSize: string,
                        searchLoginTerm: string,
                        searchEmailTerm: string): Promise<ContentPageType> {

        const content = await usersRepository.giveUsers(sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm)
        const totalCount = await usersRepository.giveTotalCount(searchLoginTerm, searchEmailTerm)

        return paginationContentPage(pageNumber, pageSize, content, totalCount)
    },

    async checkCredential(loginOrEmail: string, password: string): Promise<boolean> {
        const user: UserType = await usersRepository.findUserByLoginOrEmail(loginOrEmail)

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