import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import Product from './Product';

@Entity('sales')
class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  campaing: string;

  @Column({ nullable: false })
  campaing_label: string;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  discount: number;

  @Column({ nullable: false })
  badge_url: string;

  @OneToMany(() => Product, (product) => product.sale, { cascade: true })
  products: Product[];

  @Column({ nullable: false, type: 'date' })
  start_date: Date;

  @Column({ nullable: false, type: 'date' })
  end_date: Date;

  @CreateDateColumn({
    default: () => 'NOW()',
  })
  created_at: Date;

  @UpdateDateColumn({
    default: () => 'NOW()',
    onUpdate: 'NOW()',
  })
  updated_at: Date;

  isActive() {
    if (
      new Date().getTime() <= new Date(this.end_date).getTime() &&
      new Date().getTime() >= new Date(this.start_date).getTime()
    ) {
      return true;
    }
    return false;
  }

  toView() {
    if (!this.isActive()) {
      return undefined;
    }

    return {
      campaing: this.campaing,
      campaing_label: this.campaing_label,
      discount: parseFloat(this.discount as any),
      badge: this.badge_url,
      start_date: new Date(this.start_date),
      end_date: new Date(this.end_date),
    };
  }

  toViewDetails() {
    return {
      ...this.toView(),
      id: this.id,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

export default Sale;
