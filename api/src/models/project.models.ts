import { IsString, IsEmail } from 'kiwi-server';

export class ProjectIn {
    @IsString() type: string;
    @IsString() name: string;
    @IsString() api_key: string;
}

export class ProjectListIn {
    @IsString() text: string;
}