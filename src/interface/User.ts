export interface IUser  { 
    _id: string,
    email: string,
    inactive: 'false' | 'true' | 'all',
    createdAt: string,
    updatedAt?: string,
    avatar?: string,
    full_name?: string
}
