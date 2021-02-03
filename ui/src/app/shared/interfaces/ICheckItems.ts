import { ILogs } from "./ILogs";
import { IProject } from "./IProject";

export interface ICheckItems{
    name:string;
    completed:boolean;
    subtasks?:ICheckItems[];
    log?:ILogs;
}
export interface ICheckProyectItems{
    name:string;
    completed:boolean;
    subtasks?:ICheckProyectItems[];
    project?:IProject;
}