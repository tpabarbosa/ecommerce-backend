import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

class CreateProductToSizeTable1659360453191 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products-to-sizes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'product_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'size_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'products-to-sizes',
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'products-to-sizes',
      new TableForeignKey({
        columnNames: ['size_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sizes',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products-to-sizes');
  }
}
export default CreateProductToSizeTable1659360453191;
