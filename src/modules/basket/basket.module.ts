import { Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Basket } from './entity/basket.entity';
import { Product } from '../products/entity/product.entity';
import { UserEntity } from '../user/entity/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Basket, Product, UserEntity])],
    controllers: [BasketController],
    providers: [BasketService],
    exports: [BasketService]
})
export class BasketModule {}
