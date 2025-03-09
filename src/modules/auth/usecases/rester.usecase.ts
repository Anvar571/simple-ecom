import { Injectable, ConflictException } from '@nestjs/common';
import { UseCase } from 'src/modules/base/usecase';
import { CreateUserDto, RegisterReturnType } from '../dto/create-user.dto';
import { CreateUserUseCase } from 'src/modules/user/usecases/createUserUseCase';
import { AppJwtService } from 'src/modules/jwt/jwt.service';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/modules/user/user.types';

@Injectable()
export class RegisterUseCase
  implements UseCase<CreateUserDto, RegisterReturnType>
{
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly jwtService: AppJwtService,
  ) {}

  async execute(param: CreateUserDto): Promise<RegisterReturnType> {
    const hashedPassword = await bcrypt.hash(param.password, 10);

    const user = await this.createUserUseCase.execute({
      ...param,
      password: hashedPassword,
      role: Role.USER,
    });

    if (!user) {
      throw new ConflictException('User already exists');
    }

    const tokens = await this.jwtService.getTokens({
      id: user.id,
      role: user.role,
    });

    return {
      user,
      ...tokens,
    };
  }
}
