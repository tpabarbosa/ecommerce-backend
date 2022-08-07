import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import Product from './Product';
import Category from './Category';

@Entity('products-to-categories')
class ProductToCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn()
  product_id: string;

  @PrimaryColumn()
  category_id: string;

  @ManyToOne(() => Product, (product) => product.categories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  toView() {
    return {
      product: this.product?.toView(),
      category: this.category?.toView(),
    };
  }
}

export default ProductToCategory;
