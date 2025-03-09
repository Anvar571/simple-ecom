import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UseCase } from 'src/modules/base/usecase';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { AppJwtService } from 'src/modules/jwt/jwt.service';
import { UserRepository } from 'src/modules/user/user.repository';
import { LoginUseCaseReturnType } from '../types';

@Injectable()
export class LoginUseCase implements UseCase<LoginDto, LoginUseCaseReturnType> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: AppJwtService,
  ) {}

  async execute(param: LoginDto): Promise<LoginUseCaseReturnType> {
    const user = await this.userRepository.findByEmail(param.email);
    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const isPasswordValid = await bcrypt.compare(param.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const refreshToken = await this.jwtService.getRefreshToken({
      id: user.id,
      role: user.role,
    });
    return { refreshToken };
  }
}
