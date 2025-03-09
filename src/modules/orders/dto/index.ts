import { IsNumber, IsEnum } from 'class-validator';

export enum OrderStatus {
  PENDING = 'pending',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export class CreateOrderDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;

  @IsEnum(OrderStatus)
  status: OrderStatus;
}

export class UpdateOrderDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
