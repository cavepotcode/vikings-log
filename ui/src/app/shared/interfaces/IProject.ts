export interface IProject {
    route?: string
    icon?: string
    title: string;
    apiKey: string;
    id?: string
    type?: string;
    countLogs?:number;
    typeLogStatus:Array<String>;
}
export interface IProjectItem {
    id?: string
    name?: string
    apiKey: string;
    type: string;
}
