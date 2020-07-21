import { JsonController, Get, Post, Param, Body} from 'kiwi-server';

@JsonController('/log')
export class LogController {

    @Post('/info')
    public post(@Body() body: any){
        return body;
    }
}