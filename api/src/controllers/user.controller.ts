import { JsonController, Get, Post, Body, Authorize, Put } from 'kiwi-server';
import { UserIn, LoginIn, ForgotPasswordIn, ResetPasswordIn } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@JsonController('/user')
export class UserController {


	constructor(private authService: AuthService) { }

	@Post('/login')
	public post(@Body() body: LoginIn) {
		return this.authService.login(body);
	}

	@Post()
	public register(@Body() body: UserIn) {
		return this.authService.register(body);
	}

	@Authorize()
	@Get('/current')
	public current(request: any) {
		return {
			result: 0,
			user: request.user.email
		}
	}

	@Authorize()
	@Get('/logout')
	public logout() {
		// TODO: not sure if we need it
	}

	@Post('/forgot-password')
	public forgotPassword(@Body() body: ForgotPasswordIn) { }


	@Put('/reset-password')
	public resetPassword(@Body() body: ResetPasswordIn) { }
}