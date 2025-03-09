import { Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { BasketService } from './basket.service';
import { AddToBasketDto, UpdateBasketDto } from './dto';

@Controller('baskets')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post('add')
  async addToBasket(@Req() req: Request, @Body() dto: AddToBasketDto) {
    return this.basketService.addToBasket(req.user['id'], dto);
  }

  @Get()
  async getUserBasket(@Req() req: Request) {
    return this.basketService.getUserBasket(req.user['id']);
  }

  @Patch('update/:id')
  async updateBasketItem(
    @Req() req: Request,
    @Param('id') basketId: number,
    @Body() dto: UpdateBasketDto,
  ) {
    return this.basketService.updateBasketItem(req.user['id'], dto);
  }

  @Delete('remove/:id')
  async removeBasketItem(@Req() req: Request, @Param('id') basketId: number) {
    return this.basketService.removeBasketItem(req.user['id'], basketId);
  }

  @Delete('clear')
  async clearBasket(@Req() req: Request) {
    return this.basketService.clearBasket(req.user['id']);
  }
}
