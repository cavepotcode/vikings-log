import { createKiwiServer, IKiwiOptions, AuthorizeResponse, getSocket } from 'kiwi-server';
import * as http from 'http';
import { LogController } from './controllers/log.controller'
import { UserController } from './controllers/user.controller'
import { AuthService } from './services/auth.service';
import { HeadersMiddleware } from './middlewares/headers.middleware.before';
import { ProjectController } from './controllers/project.controller';
import { GenericController } from './controllers/generic.controller';
import { environment } from '../environments/environment';

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
    controllers: [LogController, UserController, ProjectController, GenericController],
    authorization: validateAuthentication,
    middlewares: [HeadersMiddleware],
    cors: {
        enabled: true,
        domains: [
            'https://log.cavepotlab.com', 
            'http://localhost:4200', 
            'https://logqa.cavepotlab.com', 
            'http://localhost', 
            'http://127.0.0.1',
            'http://15.228.18.221'
        ]
    },
    documentation: {
        enabled: true,
        path: '/apidoc'
    },
    prefix: '/v1',
    log: true,
    port: 8099,
    socket: {
        enabled: true,
        path: ''//environment.socket_path
    }
}
const server = createKiwiServer(options, socketInit);


function socketInit() {
    const io = getSocket();
    
    io.on('connection', (client: any) => {
        client.userId  = client.handshake.query.user;
        client.on('event', data => { console.log(data) });
        client.on('disconnect', () => { console.log('disconnect') });
    });
    
}



