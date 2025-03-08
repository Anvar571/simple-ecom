import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { UserCreateDto, UserResponse } from '../user.types';
import { UseCase } from 'src/modules/base/usecase';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class CreateUserUseCase implements UseCase<UserCreateDto, UserResponse> {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(param: UserCreateDto) {
    const user = await this.userRepository.findByParam({
      email: param.email,
      phone: param.phone,
    });

    if (user) {
      throw new ConflictException('User already exists');
    }

    const newUser = new UserEntity({
      ...param,
      password: param.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.userRepository.create(newUser);
  }
}
