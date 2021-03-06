export interface ILogs {
    id: string
    message: string;
    level: string;
    type: string;
    project: string;
    date: string;
    info: any;
    exception: IException;
    status: string;
    history: Array<IHistoryLog>;
}

export interface IHistoryLog{
    date :Date;
    fromStatus:string;
    toStatus:string;
    user:string;
}

export interface IException {
    code: number;
    message: string;
    stack: string;
}

export interface ILogsFilter {
    level: string;
    dateFrom?: string;
    dateTo?: string;
    text?: string;
    status: string;
}

export interface ILogsStatus{
    id:string;
    status?:string;
}