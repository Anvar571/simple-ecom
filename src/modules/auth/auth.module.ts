import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { RegisterUseCase } from './usecases/registerUseCase';
import { AppJwtService } from '../jwt/jwt.service';
import { AppConfigService } from 'src/common/configs/config.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [RegisterUseCase, AppJwtService, AppConfigService],
})
export class AuthModule {}
