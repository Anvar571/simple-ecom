import { Module } from '@nestjs/common';

import { AppConfigModule } from './configs/config.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { SuccessResponseInterceptor } from './interceptors/success.response';
import { ExceptionFilter } from './exceptions/exception.filter';
import { AppAuthGuard } from './guard/auth.guard';
import { RoleGuard } from './guard/role.guard';

@Module({
  imports: [AppConfigModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SuccessResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AppAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class CommonModule {}
