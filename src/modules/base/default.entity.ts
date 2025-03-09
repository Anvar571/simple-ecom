import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class DefaultEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @CreateDateColumn({
    name: 'createdAt',
  })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    name: 'updatedAt',
  })
  updatedAt: Date;
}
