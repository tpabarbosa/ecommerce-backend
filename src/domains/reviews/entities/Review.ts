import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import Product from '../../products/entities/Product';
import User from '../../users/entities/User';

@Entity('reviews')
class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn({ nullable: false, type: 'uuid' })
  user_id: string;

  @PrimaryColumn({ nullable: false, type: 'uuid' })
  product_id: string;

  @Column({ nullable: false, type: 'text' })
  title: string;

  @Column({ nullable: false, type: 'text' })
  content: string;

  @Column({ nullable: false, type: 'boolean' })
  recommend: boolean;

  @Column({ nullable: false, type: 'integer' })
  rating: number;

  @CreateDateColumn({
    default: () => 'NOW()',
  })
  created_at: Date;

  @UpdateDateColumn({
    default: () => 'NOW()',
    onUpdate: 'NOW()',
  })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Product, (product) => product.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  toViewProduct() {
    return {
      id: this.id,
      user: { firstname: this.user?.firstname, lastname: this.user?.lastname },
      product: this.product?.toView(),
      title: this.title,
      content: this.content,
      recommend: this.recommend,
      rating: this.rating,
      updated_at: this.updated_at,
    };
  }

  toView() {
    return {
      id: this.id,
      user: this.user?.toView(),
      product: this.product?.toView(),
      title: this.title,
      content: this.content,
      recommend: this.recommend,
      rating: parseFloat(this.rating as any),
      updated_at: this.updated_at,
    };
  }

  toViewUser() {
    return {
      id: this.id,
      product: this.product?.toView(),
      title: this.title,
      content: this.content,
      recommend: this.recommend,
      rating: parseFloat(this.rating as any),
      updated_at: this.updated_at,
    };
  }
}

export default Review;
