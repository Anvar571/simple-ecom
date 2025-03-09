import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Roles } from 'src/common/decorators/role';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { Order } from './entity/order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Roles('admin')
  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  @Get('user/:id')
  async getUserOrders(@Param('id') userId: number): Promise<Order[]> {
    return this.orderService.getUserOrders(userId);
  }

  @Get(':id')
  async getOrderById(@Param('id') orderId: number): Promise<Order> {
    return this.orderService.getOrderById(orderId);
  }

  @Roles('admin')
  @Patch(':id')
  async updateOrderStatus(
    @Param('id') orderId: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.updateOrderStatus(orderId, updateOrderDto);
  }

  @Roles('admin')
  @Delete(':id')
  async deleteOrder(@Param('id') orderId: number): Promise<void> {
    return this.orderService.deleteOrder(orderId);
  }
}
