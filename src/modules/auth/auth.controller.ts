import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  public register() {}

  @Post("login")
  public login() {}

  @Post("refresh")
  public refresh() {}
}
