import { createKiwiServer, IKiwiOptions, AuthorizeResponse } from 'kiwi-server';
import * as http from 'http';
import { LogController } from './controllers/log.controller'
import { UserController } from './controllers/user.controller'
import { AuthService } from './services/auth.service';
import { HeadersMiddleware } from './middlewares/headers.middleware.before';

async function validateAuthentication(request: http.IncomingMessage, roles: Array<string>): Promise<AuthorizeResponse | boolean> {
    const token = request.headers['authorization'];
    if (!token) {
      return new AuthorizeResponse(401, 'User is not atuhenticated')
    }
    const authService = new AuthService();
    request['user'] = authService.decode(token);
    return await authService.validate(token);
}

const options: IKiwiOptions = {
    controllers: [ LogController, UserController ],
    authorization: validateAuthentication,
    middlewares: [  HeadersMiddleware ],
    cors: {
        enabled: true,
        domains: ['http://log.cavepotlab.com']
    },
    documentation: {
        enabled: true,
        path: '/apidoc'
    },
    prefix: '/v1',
    log: true,
    port: 8099
}
const server = createKiwiServer(options);