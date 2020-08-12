import { IsString, IsEmail } from 'kiwi-server';

export class LogIn{
  @IsString() message: string;
  @IsString() stackTrace: string;
}

export class LogListIn{
  @IsString() page: number;
  @IsString() size: number;
}