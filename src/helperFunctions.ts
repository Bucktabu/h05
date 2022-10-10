import {blogsType} from "./types/blogs-type";
import {postsType} from "./types/posts-type";

export const giveSkipNumber = (pageNumber: string | null | undefined,
                               pageSize: string | null | undefined) => {
    if (!pageNumber) {
        return 0
    }

    if (!pageSize) {
        return Number(pageNumber) - 1
    }

    return (Number(pageNumber) - 1) * Number(pageSize)
}

export const totalCount = (content: postsType | blogsType) => {
    return content.length
}

export const currentPage = (pageNumber: string | null | undefined) => {
    if (!pageNumber) {
        return 1
    }

    return Number(pageNumber)
} // validation default pageNumber

export const contentOnThePage = (pageSize: string | null | undefined) => {
    if (!pageSize) {
        return 10
    }

    return Number(pageSize)
} // validation default pageSize

export const pagesCount = (pageSize: string | null | undefined, content: postsType | blogsType) => {
    return Math.ceil(totalCount(content) / contentOnThePage(pageSize))
}

