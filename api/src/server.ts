import { createKiwiServer, IKiwiOptions, AuthorizeResponse } from 'kiwi-server';
import * as http from 'http';
import { LogController } from './/controllers/log.controller'

async function validateAuthentication(request: http.IncomingMessage, roles: Array<string>): Promise<AuthorizeResponse | boolean> {
  console.log(roles);
  return true;
  // return new AuthorizeResponse(403, 'fasdfasdfdasgas dgs dsg');
}

const options: IKiwiOptions = {
    controllers: [LogController],
    authorization: validateAuthentication,
    middlewares: [],
    cors: {
        enabled: true,
        domains: []
    },
    documentation: {
        enabled: true,
        path: '/apidoc'
    },
    prefix: '/v1',
    log: true,
    port: 8086
}
const server = createKiwiServer(options);