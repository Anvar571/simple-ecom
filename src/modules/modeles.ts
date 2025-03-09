import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppConfigService } from '../common/configs/config.service';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { AppConfigModule } from 'src/common/configs/config.module';
import { JwtModule } from '@nestjs/jwt';
import { AppJwtModule } from './jwt/jwt.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => ({
        type: configService.database.type as any,
        host: configService.database.host,
        port: configService.database.port,
        username: configService.database.username,
        password: configService.database.password,
        database: configService.database.database,
        entities: [UserEntity],
        synchronize: true,
      }),
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [AppJwtModule],
      inject: [AppConfigService],
      useFactory: (appConfig: AppConfigService) => ({
        secret: appConfig.jwt.secret,
      }),
    }),
    AuthModule,
    UserModule,
  ],
})
export class Modules {}
