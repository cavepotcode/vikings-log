"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const kiwi_server_1 = require("kiwi-server");
function validateAuthentication(request, roles) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(roles);
        return true;
        // return new AuthorizeResponse(403, 'fasdfasdfdasgas dgs dsg');
    });
}
const options = {
    controllers: [],
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
    log: true,
    port: 8086
};
const server = kiwi_server_1.createKiwiServer(options);
//# sourceMappingURL=server.js.map