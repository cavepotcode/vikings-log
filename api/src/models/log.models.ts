import { IsString, IsEmail, IsDate, IsNumber } from 'kiwi-server';
import { isNumber, isString } from 'util';

export class LogIn{
  @IsString() message: string;
  @IsString() level: string;
  @IsString() type: string;
  @IsDate() date: Date;
  @IsString() project: string;
  exception: Exception;
  @IsString() info: any;
}

export class Exception{
    @IsNumber() code: number;
    @IsString() message: string;
    @IsString() stack: string;
}

export class LogListIn{
  @IsString() page: number;
  @IsString() size: number;
}