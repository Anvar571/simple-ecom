import { IsInt, IsNumber, Min } from 'class-validator';

export class AddToBasketDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;
}

export class UpdateBasketDto {
  @IsInt()
  basketId: number;

  @IsInt()
  @Min(1)
  quantity: number;
}
