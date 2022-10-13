export type UserType = {
    id: string,
    login: string,
    email: string,
    // passwordHash: string,
    // passwordSalt: string,
    createdAt: string
}

export type UsersType = UserType[]

export type UsersDBType = {
    _id: string,
    id: string,
    login: string,
    email: string,
    passwordHash: string,
    passwordSalt: string,
    createdAt: string
}