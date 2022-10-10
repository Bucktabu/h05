import {blogsRepository} from "../repositories/blogs-repository";
import {blogType} from "../types/blogs-type";
import {contentPageType} from "../types/contentPage-type";
import {paginationContentPage} from "../paginationContentPage";


export const blogsService = {
    async createNewBlog(name: string, youtubeUrl: string): Promise<blogType> {
        const newBlog: blogType = {
            id: String(+new Date()),
            name: name,
            youtubeUrl: youtubeUrl,
            createdAt: new Date().toISOString()
        }

        await blogsRepository.createNewBlog({...newBlog})
        return newBlog
    },

    async giveBlogsPage(sortBy: string | undefined,
                        sortDirection: string | undefined,
                        pageNumber: string | null | undefined, // номер страницы, которая будет возвращена
                        pageSize: string | null | undefined,
                        searchNameTerm?: string) // количество элементов на странице
                            : Promise<contentPageType> {
        const content = await blogsRepository.giveBlogs(sortBy, sortDirection, pageNumber, pageSize, searchNameTerm)

        return paginationContentPage(sortBy, sortDirection, pageNumber, pageSize, content)
    },

    async giveBlogById(id: string): Promise<blogType | null> {
        return await blogsRepository.giveBlogById(id)
    },

    async updateBlog(id: string, name: string, youtubeUrl: string): Promise<boolean> {
        return await blogsRepository.updateBlog(id, name, youtubeUrl)
    },

    async deleteBlogById(id: string): Promise<boolean> {
        return await blogsRepository.deleteBlogById(id)
    },
}