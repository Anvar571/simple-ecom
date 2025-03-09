import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/modules/products/entity/product.entity';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { AddToBasketDto, UpdateBasketDto } from './dto';
import { Basket } from './entity/basket.entity';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async addToBasket(userId: any, dto: AddToBasketDto): Promise<Basket> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const product = await this.productRepository.findOne({
      where: { id: dto.productId },
    });
    if (!product) throw new NotFoundException('Product not found');

    let basketItem = await this.basketRepository.findOne({
      where: { user, product },
    });

    if (basketItem) {
      basketItem.quantity += dto.quantity;
    } else {
      basketItem = this.basketRepository.create({
        user,
        product,
        quantity: dto.quantity,
      });
    }

    return this.basketRepository.save(basketItem);
  }

  async getUserBasket(userId: number): Promise<Basket[]> {
    return this.basketRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }

  async updateBasketItem(
    userId: number,
    dto: UpdateBasketDto,
  ): Promise<Basket> {
    const basketItem = await this.basketRepository.findOne({
      where: { id: dto.basketId, user: { id: userId } },
    });

    if (!basketItem) throw new NotFoundException('Basket item not found');

    basketItem.quantity = dto.quantity;
    return this.basketRepository.save(basketItem);
  }

  async removeBasketItem(userId: number, basketId: number): Promise<void> {
    const basketItem = await this.basketRepository.findOne({
      where: { id: basketId, user: { id: userId } },
    });

    if (!basketItem) throw new NotFoundException('Basket item not found');

    await this.basketRepository.remove(basketItem);
  }

  async clearBasket(userId: number): Promise<void> {
    await this.basketRepository.delete({ user: { id: userId } });
  }
}
