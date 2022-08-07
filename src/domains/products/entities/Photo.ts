import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Product from './Product';

@Entity('photos')
class Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  url: string;

  @ManyToOne(() => Product, (product) => product.photos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @CreateDateColumn({
    default: () => 'NOW()',
  })
  created_at: Date;

  @UpdateDateColumn({
    default: () => 'NOW()',
    onUpdate: 'NOW()',
  })
  updated_at: Date;

  toView() {
    return {
      description: this.description,
      url: this.url,
      product: this.product,
    };
  }

  toViewDetails() {
    return {
      id: this.id,
      description: this.description,
      url: this.url,
      product: this.product,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

export default Photo;
