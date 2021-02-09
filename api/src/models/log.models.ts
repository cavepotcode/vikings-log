import { IsString, IsDate, IsNumber } from 'kiwi-server';
import { isDate, isString } from 'util';
import { Log } from '../datastore/entities';

//TODO:: fix exception object. @IsObject...
export class LogIn {
    @IsString() message: string;
    @IsString() type: string;
    @IsDate() date: Date;
    exception: Exception;
    @IsString() info: any;
}

export class Exception {
    @IsNumber() code: number;
    @IsString() message: string;
    @IsString() stack: string;
}

export class LogListIn {
    @IsNumber() page: string;
    @IsNumber() size: string;
    @IsString() text: string;
    @IsString() level: string;
    @IsDate() dateFrom: Date;
    @IsDate() dateTo: Date;
    @IsString() status: string;
}

export class LogUpdate {
    @IsString() id: string;
    @IsString() status: string;
    history: Array<HistoryLog>;
}

export class LogListOut {
    items: Array<Log>;
    total: number;
}

export class HistoryLog{
    @IsDate() date :Date;
    @IsString() movements:string;
    @IsString() user:string;

}