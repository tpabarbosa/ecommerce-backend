import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Product from '../../products/entities/Product';
import User from './User';

@Entity('wishlists')
class WishListItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn({ nullable: false, type: 'uuid' })
  user_id: string;

  @PrimaryColumn({ nullable: false, type: 'uuid' })
  product_id: string;

  // @CreateDateColumn({
  //   default: () => 'NOW()',
  // })
  // created_at: Date;

  @ManyToOne(() => User, (user) => user.wishlist, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Product, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  toView() {
    return {
      id: this.id,
      user: this.user?.toView(),
      product: this.product?.toView(),
      // created_at: this.created_at,
      // updated_at: this.updated_at,
    };
  }
}

export default WishListItem;
