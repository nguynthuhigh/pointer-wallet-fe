export interface IUser  { 
    _id: string,
    email: string,
    inactive: boolean,
    createdAt: string,
    updatedAt: string,
    avatar?: string,
    full_name?: string
}