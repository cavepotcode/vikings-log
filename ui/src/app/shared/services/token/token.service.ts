import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Constants } from '../../consts/app-constants';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor(private jwtHelper: JwtHelperService) { }

    public isAdmin() {
        let token = this.jwtHelper.decodeToken();
        if (token['role'] === Constants.ROLE_ADMINISTRATOR) {
            return true;
        }
        return false
    }
    public getPayload() {
        let token = this.jwtHelper.decodeToken();
        let payload = {
            id: token['id'],
            username: token['username'],
            email: token['email'],
            role: token['role']
        }
        return payload;
    }

}
