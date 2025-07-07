import { Review } from 'src/reviews/reviews.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: false,
  })
  title: string;
  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;
  @Column({
    type: 'text',
    nullable: true,
  })
  imageUrl?: string;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;
  @DeleteDateColumn({
    type: 'timestamp',
  })
  deletedAt: Date;
}
