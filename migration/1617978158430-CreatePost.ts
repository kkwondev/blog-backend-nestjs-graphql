import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePost1617978158430 implements MigrationInterface {
    name = 'CreatePost1617978158430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `Tag` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `postId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `Post` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `content` varchar(255) NOT NULL, `thumbnail_img` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `Tag` ADD CONSTRAINT `FK_5e581721885681fea6a4c311236` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Post` ADD CONSTRAINT `FK_97e81bcb59530bfb061e48aee6a` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `Post` DROP FOREIGN KEY `FK_97e81bcb59530bfb061e48aee6a`");
        await queryRunner.query("ALTER TABLE `Tag` DROP FOREIGN KEY `FK_5e581721885681fea6a4c311236`");
        await queryRunner.query("DROP TABLE `Post`");
        await queryRunner.query("DROP TABLE `Tag`");
    }

}
