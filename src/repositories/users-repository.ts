import {blogsCollection, usersCollection} from "./db";
import {UsersType, UserType} from "../types/user-type";
import {giveSkipNumber} from "../helperFunctions";

export const usersRepository = {
    async createNewUser(newUser: UserType): Promise<UserType> {
        await usersCollection.insertOne(newUser)
        return newUser
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

    async giveUserById(userId: string): Promise<UserType | null> {
        return await usersCollection.findOne({id: userId})
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

    async deleteUserById(id: string): Promise<boolean> {
        const result = await usersCollection.deleteOne({id: id})

        return result.deletedCount === 1
    },

    async deleteAllUsers(): Promise<boolean> {
        try {
            await usersCollection.deleteMany({})
            return true
        } catch (e) {
            console.log('blogsCollection => deleteAllBlogs =>', e)
            return false
        }
    }
}