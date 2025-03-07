import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateUserUseCase } from './usecases/createUserUseCase';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUseCase: CreateUserUseCase
  ) {}

  @Get()
  findAllUser() {
    return 'All users';
  }

  @Post("create")
  createUser(@Body() body: any) {
    this.createUseCase.execute(body);
  }
}
