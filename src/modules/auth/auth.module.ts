import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { RegisterUseCase } from './usecases/rester.usecase';
import { AppJwtService } from '../jwt/jwt.service';
import { AppConfigService } from 'src/common/configs/config.service';
import { LoginUseCase } from './usecases/login.usecase';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [RegisterUseCase, AppJwtService, AppConfigService, LoginUseCase],
})
export class AuthModule {}
