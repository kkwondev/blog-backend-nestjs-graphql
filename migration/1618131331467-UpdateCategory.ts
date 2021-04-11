import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateCategory1618131331467 implements MigrationInterface {
    name = 'UpdateCategory1618131331467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `Category` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `Category` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `Category` DROP COLUMN `updatedAt`");
        await queryRunner.query("ALTER TABLE `Category` DROP COLUMN `createdAt`");
    }

}
