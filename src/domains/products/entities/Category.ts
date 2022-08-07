import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import ProductToCategory from './ProductToCategory';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false, unique: true })
  slug: string;

  @CreateDateColumn({
    default: () => 'NOW()',
  })
  created_at: Date;

  @UpdateDateColumn({
    default: () => 'NOW()',
    onUpdate: 'NOW()',
  })
  updated_at: Date;

  @OneToMany(
    () => ProductToCategory,
    (postToCategory) => postToCategory.product
  )
  products: ProductToCategory[];

  toView() {
    return {
      id: this.id,
      name: this.name,
      slug: this.slug,
    };
  }

  toViewDetails() {
    return {
      id: this.id,
      name: this.name,
      slug: this.slug,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

export default Category;
