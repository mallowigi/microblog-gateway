import { LoginRequest }                       from '@mallowigi/common';
import { AuthService }                        from '@mallowigi/gateway/src/auth/auth.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {

  }

  @Post('login')
  async login(@Body() req: LoginRequest) {
    return await this.authService.login(req);
  }

  @Get('user/:token')
  async getUser(@Param('token') token) {
    return this.authService.getUser({ token });
  }
}
