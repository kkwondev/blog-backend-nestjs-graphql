import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1617632549281 implements MigrationInterface {
  name = 'CreateUser1617632549281';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `User` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `nickname` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `User`');
  }
}
