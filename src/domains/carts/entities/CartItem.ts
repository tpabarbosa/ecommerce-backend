import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Product from '../../products/entities/Product';
import Size from '../../products/entities/Size';
import User from '../../users/entities/User';

@Entity('cart-items')
class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn({ nullable: false, type: 'uuid' })
  user_id: string;

  @PrimaryColumn({ nullable: false, type: 'uuid' })
  product_id: string;

  @Column({ nullable: true, type: 'uuid' })
  size_id: string;

  @Column({ nullable: false, type: 'integer' })
  quantity: number;

  @CreateDateColumn({
    default: () => 'NOW()',
  })
  created_at: Date;

  @UpdateDateColumn({
    default: () => 'NOW()',
    onUpdate: 'NOW()',
  })
  updated_at: Date;

  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Product, {
    cascade: true,
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Size, {
    cascade: true,
  })
  @JoinColumn({ name: 'size_id' })
  size: Size;

  toView() {
    return {
      item_id: this.id,
      // user: this.user?.toView(),
      product: this.product?.toView(),
      size: this.size?.toViewDetails(),
      quantity: this.quantity,
      // created_at: this.created_at,
      // updated_at: this.updated_at,
    };
  }
}

export default CartItem;
