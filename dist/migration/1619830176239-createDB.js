"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDB1619830176239 = void 0;
class createDB1619830176239 {
    constructor() {
        this.name = 'createDB1619830176239';
    }
    async up(queryRunner) {
        await queryRunner.query('CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `email` varchar(255) NOT NULL, `password` varchar(255) NULL, `photo_url` varchar(255) NULL, `nickname` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `posts` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `title` varchar(255) NOT NULL, `slug` varchar(255) NOT NULL, `content` varchar(255) NOT NULL, `thumbnail_img` varchar(255) NULL, `userId` int NOT NULL, `categoryId` int NOT NULL, PRIMARY KEY (`id`, `userId`, `categoryId`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `categories` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `tags` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `title` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `post_tags` (`id` int NOT NULL AUTO_INCREMENT, `postId` int NOT NULL, `tagId` int NOT NULL, PRIMARY KEY (`id`, `postId`, `tagId`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `social_accounts` (`id` int NOT NULL AUTO_INCREMENT, `provider` varchar(12) NOT NULL, `social_id` varchar(255) NOT NULL, `user_id` int NULL, INDEX `IDX_f02f396a5b4446bcc4a055095e` (`provider`, `social_id`), UNIQUE INDEX `REL_05a0f282d3bed93ca048a7e54d` (`user_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('ALTER TABLE `posts` ADD CONSTRAINT `FK_ae05faaa55c866130abef6e1fee` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `posts` ADD CONSTRAINT `FK_168bf21b341e2ae340748e2541d` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `post_tags` ADD CONSTRAINT `FK_76e701b89d9bba541e1543adfac` FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `post_tags` ADD CONSTRAINT `FK_86fabcae8483f7cc4fbd36cf6a2` FOREIGN KEY (`tagId`) REFERENCES `tags`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `social_accounts` ADD CONSTRAINT `FK_05a0f282d3bed93ca048a7e54dd` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE `social_accounts` DROP FOREIGN KEY `FK_05a0f282d3bed93ca048a7e54dd`');
        await queryRunner.query('ALTER TABLE `post_tags` DROP FOREIGN KEY `FK_86fabcae8483f7cc4fbd36cf6a2`');
        await queryRunner.query('ALTER TABLE `post_tags` DROP FOREIGN KEY `FK_76e701b89d9bba541e1543adfac`');
        await queryRunner.query('ALTER TABLE `posts` DROP FOREIGN KEY `FK_168bf21b341e2ae340748e2541d`');
        await queryRunner.query('ALTER TABLE `posts` DROP FOREIGN KEY `FK_ae05faaa55c866130abef6e1fee`');
        await queryRunner.query('DROP INDEX `REL_05a0f282d3bed93ca048a7e54d` ON `social_accounts`');
        await queryRunner.query('DROP INDEX `IDX_f02f396a5b4446bcc4a055095e` ON `social_accounts`');
        await queryRunner.query('DROP TABLE `social_accounts`');
        await queryRunner.query('DROP TABLE `post_tags`');
        await queryRunner.query('DROP TABLE `tags`');
        await queryRunner.query('DROP TABLE `categories`');
        await queryRunner.query('DROP TABLE `posts`');
        await queryRunner.query('DROP TABLE `users`');
    }
}
exports.createDB1619830176239 = createDB1619830176239;
//# sourceMappingURL=1619830176239-createDB.js.map