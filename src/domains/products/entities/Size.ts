import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import ProductToSize from './ProductToSize';

@Entity('sizes')
class Size {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @CreateDateColumn({
    default: () => 'NOW()',
  })
  created_at: Date;

  @UpdateDateColumn({
    default: () => 'NOW()',
    onUpdate: 'NOW()',
  })
  updated_at: Date;

  @OneToMany(() => ProductToSize, (postToSize) => postToSize.product)
  products: ProductToSize[];

  toView() {
    return {
      id: this.id,
      name: this.name,
    };
  }

  toViewDetails() {
    return {
      id: this.id,
      name: this.name,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

export default Size;
