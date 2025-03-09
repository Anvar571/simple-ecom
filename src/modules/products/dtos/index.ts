import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  stock: number;

  @ApiProperty()
  @IsNumber()
  categoryId: number;

  @ApiProperty()
  @IsString()
  image: string;
}

export class UpdateProductDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  stock?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image?: string;
}
