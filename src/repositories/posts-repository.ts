import {postsCollection} from "./db";
import {postType} from "../types/posts-type";

export const postsRepository = {
    async createNewPost(newPost: postType): Promise<postType> {
        await postsCollection.insertOne(newPost)

        return newPost
    },

    async givePosts(blogId: string | undefined, sortBy: string | undefined, sortDirection: string | undefined) {

        const filter: any = {}

        if (blogId) {
            filter.blogId = blogId
        }

        if (!sortBy) {
            sortBy = 'createdAt'
        }

        if (!sortDirection) {
            sortDirection = 'desc'
        }

        return await postsCollection
            .find(filter, {projection: {_id: false}})
            .sort(sortBy, sortDirection === 'asc' ? 1 : -1)
            .toArray()
    },

    async givePostById(id: string): Promise<postType | null> {
       return await postsCollection.findOne({id:id}, {projection: {_id: false}})
    },

    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
        const result = await postsCollection.updateOne({id: id}, {$set: {title: title, shortDescription: shortDescription, content: content, blogId: blogId}})

        return result.matchedCount === 1
    },

    async deletePostById(id: string): Promise<boolean> {
        const result = await postsCollection.deleteOne({id: id})

        return result.deletedCount === 1
    },

    async deleteAllPosts(): Promise<boolean> {
        try {
            await postsCollection.deleteMany({})
            return true
        } catch (e) {
            console.log('postsCollection => deleteAllPosts =>', e)
            return false
        }
    }
}