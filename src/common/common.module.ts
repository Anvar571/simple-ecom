import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from './configs/config.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { SuccessResponseInterceptor } from './interceptors/success.response';
import { ExceptionFilter } from './exceptions/exception.filter';
import { ConfigService } from './configs/config.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.database.type as any,
        host: configService.database.host,
        port: configService.database.port,
        username: configService.database.username,
        password: configService.database.password,
        database: configService.database.database,
        synchronize: true,
      })
    })
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SuccessResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
  ],
})
export class CommonModule {}
