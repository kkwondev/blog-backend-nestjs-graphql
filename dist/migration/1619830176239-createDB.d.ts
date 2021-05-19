import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class createDB1619830176239 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
