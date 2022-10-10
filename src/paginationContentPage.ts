import {blogsType} from "./types/blogs-type";
import {postsType} from "./types/posts-type";
import {contentOnThePage, currentPage, giveSkipNumber, pagesCount, totalCount} from "./helperFunctions";

export const paginationContentPage = (sortBy: string | undefined,
                                      sortDirection: string | undefined,
                                      pageNumber: string | null | undefined, // номер страницы, которая будет возвращена
                                      pageSize: string | null | undefined,
                                      content: blogsType | postsType) => {

    const pageWithContent = {
        "pagesCount": pagesCount(pageSize, content),
        "page": currentPage(pageNumber),
        "pageSize": contentOnThePage(pageSize),
        "totalCount": totalCount(content),
        "items": content.slice(giveSkipNumber(pageNumber, pageSize), giveSkipNumber(pageNumber, pageSize) + contentOnThePage(pageSize))
    }

    return pageWithContent
}