import { IsString } from 'kiwi-server';
import { Project } from '../datastore/entities';

export class UserIn{
  @IsString() username: string;
  @IsString() email: string;
  @IsString() password: string;
}

export class LoginIn{
  @IsString() username: string;
  @IsString() password: string;
}

export class ForgotPasswordIn{
  @IsString() username: string;
}

export class ResetPasswordIn{
  @IsString() token: string;
  @IsString() password: string;
}

export class CreateUserIn{
    @IsString() username: string;
    @IsString() email: string;
    @IsString() role:string;
    @IsString() password:string;
    projects: Array<Project>;   
}
export class UpdateUserIn{
    @IsString() username: string;
    @IsString() email: string;
    @IsString() role:string;
    projects: Array<Project>;   
}