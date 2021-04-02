import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1617352534079 implements MigrationInterface {
  name = 'CreateUser1617352534079';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `User` ADD `email` varchar(255) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `User` ADD `password` varchar(255) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `User` ADD `nickname` varchar(255) NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `User` DROP COLUMN `nickname`');
    await queryRunner.query('ALTER TABLE `User` DROP COLUMN `password`');
    await queryRunner.query('ALTER TABLE `User` DROP COLUMN `email`');
  }
}
