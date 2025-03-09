import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppConfigService } from '../common/configs/config.service';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { AppConfigModule } from 'src/common/configs/config.module';
import { JwtModule } from '@nestjs/jwt';
import { AppJwtModule } from './jwt/jwt.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './products/product.module';
import { OrderModule } from './orders/order.module';
import { BasketModule } from './basket/basket.module';
import { Category } from './category/entity/category.entity';
import { Order } from './orders/entity/order.entity';
import { Basket } from './basket/entity/basket.entity';
import { Product } from './products/entity/product.entity';

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
        entities: [UserEntity, Category, Product, Order, Basket],
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
    CategoryModule,
    ProductModule,
    OrderModule,
    BasketModule,
  ],
})
export class Modules {}
