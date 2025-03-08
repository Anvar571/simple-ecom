import {
  Entity,
  Column,
} from 'typeorm';
import { UserModel } from '../user.types';
import { DefaultEntity } from '../../base/default.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity("users")
export class UserEntity extends DefaultEntity implements UserModel {
  @ApiProperty()
  @Column({ length: 100 })
  fullname: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({ unique: true })
  phone: string;

  @Column()
  password: string;

  constructor(user: UserModel) {
    super();
    Object.assign(this, user);
  }
}
