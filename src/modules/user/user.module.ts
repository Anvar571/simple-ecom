import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { CreateUserUseCase } from './usecases/createUserUseCase';
import { UserRepository } from './user.repository';
import { FindAllUserUseCase } from './usecases/findAllUsersUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [CreateUserUseCase, UserRepository, FindAllUserUseCase],
  exports: [CreateUserUseCase, UserRepository, FindAllUserUseCase],
})
export class UserModule {}
