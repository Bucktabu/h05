import {blogsCollection, usersCollection} from "./db";
import {UsersType, UserType} from "../types/user-type";
import {giveSkipNumber} from "../helperFunctions";


export const usersRepository = {
    async createNewUser(newUser: UserType): Promise<UserType> {
        await usersCollection.insertOne(newUser)
        return newUser
    },

    async findUserByLoginOrEmail(loginOrEmail: string) {
        const user = await usersCollection.insertOne({$or: [{email: loginOrEmail}, {userName: loginOrEmail}]})
        return user
    },

    async giveUsers(sortBy: string,
                    sortDirection: string,
                    pageNumber: string,
                    pageSize: string,
                    searchLoginTerm: string,
                    searchEmailTerm: string): Promise<UsersType> {

        const filter: any = {}

        if (searchLoginTerm) {
            filter.login = {$regex: searchLoginTerm, $options: 'i'}
        }

        if (searchEmailTerm) {
            filter.email = {$regex: searchEmailTerm, $options: 'i'}
        }

        return await usersCollection
            .find(filter, {projection: {_id: false}})
            .sort(sortBy, sortDirection === 'asc' ? 1 : -1)
            .skip(giveSkipNumber(pageNumber, pageSize))
            .limit(Number(pageSize))
            .toArray()
    },

    async giveTotalCount(searchLoginTerm: string, searchEmailTerm: string): Promise<number> {

        if (searchLoginTerm) {
            return await blogsCollection.countDocuments({login: {$regex: searchLoginTerm, $options: 'i'}})
        }

        if (searchEmailTerm) {
            return await blogsCollection.countDocuments({email: {$regex: searchEmailTerm, $options: 'i'}})
        }

        return await blogsCollection.countDocuments({})
    },
}