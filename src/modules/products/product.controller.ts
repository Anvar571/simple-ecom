import { Controller, Post, UseGuards, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Roles } from "src/common/decorators/role";
import { CreateProductDto } from "./dtos";

@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post()
  @Roles('admin')
  create(@Body() dto: CreateProductDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: number, @Body() dto: Partial<CreateProductDto>) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
