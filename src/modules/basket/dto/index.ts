import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, Min } from 'class-validator';

export class AddToBasketDto {
  @ApiProperty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;
}

export class UpdateBasketDto {
  @ApiProperty()
  @IsInt()
  basketId: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  quantity: number;
}
