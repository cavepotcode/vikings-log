import { ILogs } from "./ILogs";

export interface ICheckItems{
    name:string;
    completed:boolean;
    subtasks?:ICheckItems[];
    log?:ILogs;
}