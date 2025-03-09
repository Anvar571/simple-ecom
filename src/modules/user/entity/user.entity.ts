import { Entity, Column, OneToMany } from 'typeorm';
import { Role, UserModel } from '../user.types';
import { DefaultEntity } from '../../base/default.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Basket } from 'src/modules/basket/entity/basket.entity';

@Entity('users')
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

  @Column({ default: 'user' })
  role: Role;

  @Column()
  password: string;

  @OneToMany(() => Basket, (basket) => basket.user)
  baskets: Basket[];

  constructor(user: UserModel) {
    super();
    Object.assign(this, user);
  }
}
