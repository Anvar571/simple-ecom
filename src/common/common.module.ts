import { Module } from '@nestjs/common';
import { ConfigModule } from './configs/config.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { SuccessResponseInterceptor } from './interceptors/success.response';
import { ExceptionFilter } from './exceptions/exception.filter';

@Module({
  imports: [ConfigModule],
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
