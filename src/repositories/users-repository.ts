import {blogsCollection, usersCollection} from "./db";
import {usersType, userType} from "../types/users-type";

export const usersRepository = {
    async createNewUser(newUser: userType): Promise<userType> {
        await usersCollection.insertOne(newUser)
        return newUser
    },

    async findUserByLoginOrEmail(loginOrEmail: string) {
        //const user = await usersCollection.insertOne({$or: [{email: loginOrEmail}, {userName: loginOrEmail}]})
        //return user
    },

    async giveUsers(sortBy?: string,
                    sortDirection?: string,
                    pageNumber?: string,
                    pageSize?: string,
                    searchLoginTerm?: string,
                    searchEmailTerm?: string): Promise<usersType> {

        const loginFilter: any = {}

        if (searchLoginTerm) {
            loginFilter.login = {$regex: searchLoginTerm, $options: 'i'}
        }

        const emailFilter: any = {}

        if (searchEmailTerm) {
            emailFilter.email = {$regex: searchEmailTerm, $options: 'i'}
        }

        if (!sortBy) {
            sortBy = 'createdAt'
        }

        if (!sortDirection) {
            sortDirection = 'desc'
        }

        return await usersCollection
            .find({$or: [loginFilter, emailFilter]}, {projection: {_id: false}})
            .sort(sortBy, sortDirection === 'asc' ? 1 : -1)
            .toArray()
    }
}