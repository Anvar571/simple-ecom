import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterUseCase } from './usecases/rester.usecase';
import { LoginUseCase } from './usecases/login.usecase';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('register')
  @Public()
  public register(@Body() createUserDto: CreateUserDto) {
    return this.registerUseCase.execute(createUserDto);
  }

  @Post('login')
  @Public()
  public login(@Body() data: LoginDto) {
    return this.loginUseCase.execute(data);
  }

  @Post('refresh')
  public refresh() {}
}
