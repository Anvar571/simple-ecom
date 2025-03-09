import { Basket } from 'src/modules/basket/entity/basket.entity';
import { Category } from 'src/modules/category/entity/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;

  @OneToMany(() => Basket, (basket) => basket.product)
  baskets: Basket[];
}
