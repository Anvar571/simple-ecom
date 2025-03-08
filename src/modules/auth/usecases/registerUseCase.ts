import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UseCase } from 'src/modules/base/usecase';
import { CreateUserDto, RegisterReturnType } from '../dto/create-user.dto';
import { CreateUserUseCase } from 'src/modules/user/usecases/createUserUseCase';
import { AppJwtService } from 'src/modules/jwt/jwt.service';

@Injectable()
export class RegisterUseCase
  implements UseCase<CreateUserDto, RegisterReturnType>
{
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly jwtService: AppJwtService,
  ) {}

  // jwt, other depend lib
  async execute(param: CreateUserDto): Promise<RegisterReturnType> {
    const hashedPassword = await bcrypt.hash(param.password, 10);

    const newUser = await this.createUserUseCase.execute({
      password: hashedPassword,
      email: param.email,
      fullname: param.fullname,
      phone: param.phone,
    });

    const tokens = await this.jwtService.getTokens({ id: newUser.id });

    return tokens;
  }
}
