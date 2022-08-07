import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import Review from '../../reviews/entities/Review';
import Category from './Category';
import Photo from './Photo';
import ProductToCategory from './ProductToCategory';
import ProductToSize from './ProductToSize';
import Sale from './Sale';
import Size from './Size';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false, unique: true })
  slug: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true, type: 'uuid' })
  sale_id: string;

  @OneToMany(() => Photo, (photo) => photo.product, { cascade: true })
  photos: Photo[];

  @ManyToOne(() => Sale, (sale) => sale.products, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;

  @OneToMany(
    () => ProductToCategory,
    (productToCategory) => productToCategory.category,
    { cascade: true }
  )
  product_categories: ProductToCategory[];

  @OneToMany(() => ProductToSize, (productToSize) => productToSize.size, {
    cascade: true,
  })
  product_sizes: ProductToSize[];

  @ManyToMany(() => Category, (category) => category.products, {
    cascade: true,
  })
  @JoinTable({
    name: 'products-to-categories',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Category[];

  @ManyToMany(() => Size, (size) => size.products, { cascade: true })
  @JoinTable({
    name: 'products-to-sizes',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'size_id', referencedColumnName: 'id' },
  })
  sizes: Size[];

  @OneToMany(() => Review, (review) => review.product, {
    cascade: true,
  })
  reviews: Review[];

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
      id: this.id,
      name: this.name,
      slug: this.slug,
      price: parseFloat(this.price as any),
      photos: this.photos?.map((photo) => photo.toView()),
      sale: this.sale?.toView(),
      sizes: this.sizes?.map((size) => size.toView()),
    };
  }

  toViewDetails() {
    return {
      id: this.id,
      name: this.name,
      slug: this.slug,
      price: parseFloat(this.price as any),
      description: this.description,
      photos: this.photos?.map((photo) => photo.toViewDetails()),
      sale: this.sale?.toViewDetails(),
      reviews: this.reviews?.map((review) => review.toView()),
      categories: this.categories?.map((category) => category.toViewDetails()),
      sizes: this.sizes?.map((size) => size.toViewDetails()),
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

export default Product;
