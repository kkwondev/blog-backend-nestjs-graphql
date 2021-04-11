import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCategory1618131153606 implements MigrationInterface {
    name = 'CreateCategory1618131153606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `Category` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `Post` ADD `categoryId` int NULL");
        await queryRunner.query("ALTER TABLE `Post` ADD CONSTRAINT `FK_8698377189038b13b89a3b13a30` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `Post` DROP FOREIGN KEY `FK_8698377189038b13b89a3b13a30`");
        await queryRunner.query("ALTER TABLE `Post` DROP COLUMN `categoryId`");
        await queryRunner.query("DROP TABLE `Category`");
    }

}
