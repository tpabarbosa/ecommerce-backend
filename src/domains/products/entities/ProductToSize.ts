import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import Product from './Product';
import Size from './Size';

@Entity('products-to-sizes')
class ProductToSize {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn()
  product_id: string;

  @PrimaryColumn()
  size_id: string;

  @ManyToOne(() => Product, (product) => product.sizes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Size, (size) => size.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'size_id' })
  size: Size;
}

export default ProductToSize;
