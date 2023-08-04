import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordColumn1691125777966 implements MigrationInterface {
    name = 'AddPasswordColumn1691125777966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "password"`);
    }

}
