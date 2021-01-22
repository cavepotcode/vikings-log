import { IProjectItem } from "./IProject";

export interface IUser {
    username: string,
    email: string,
    id: string,
    iat: number,
    exp: number
}

export interface ICreateUser {
    username: string,
    email: string,
    role: string,
    password:string,
    projects: Array<IProjectItem>;
}
export interface IUserWithOutPassword{
    username: string,
    email: string,
    role: string,
    projects: Array<IProjectItem>;
}