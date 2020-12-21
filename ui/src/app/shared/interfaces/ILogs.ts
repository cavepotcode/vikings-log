export interface ILogs {
    id:string
    message: string;
    level: string;
    type: string;
    project: string;
    date: string;
    info: any;
    exception: IException;

}

export interface IException{
    code: number;
    message: string;
    stack:string;
}

export interface ILogsFilter{
    level:string;
    dateFrom?: string;
    dateTo?:string;
    text?:string;
}