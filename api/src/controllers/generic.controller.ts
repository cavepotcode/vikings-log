import { Authorize, Get, JsonController } from "kiwi-server";
import { Response } from '../sdk/response';
import { ResponseCode, levels } from '../sdk/constants';

@Authorize()
@JsonController('/generic')
export class GenericController {

    constructor() {}

    @Get('/levelsCode')
    public async levelsCode() {
        return new Response(ResponseCode.OK,levels);
    }

}