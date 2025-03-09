import { Product } from 'src/modules/products/entity/product.entity';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

@Entity('baskets')
export class Basket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.baskets)
  user: UserEntity;

  @ManyToOne(() => Product, (product) => product.baskets)
  product: Product;

  @Column()
  quantity: number;
}
