export type userType = {
    id: string,
    login: string,
    email: string,
    passwordHash: string,
    passwordSalt: string,
    createdAt: string
}

export type usersType = userType[]
