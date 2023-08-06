import { MigrationInterface, QueryRunner } from "typeorm";

export class EmployeeTableModified1691332847584 implements MigrationInterface {
    name = 'EmployeeTableModified1691332847584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line1"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "address_line1" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "address_line2" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "country" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "joining_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "experience" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "is_active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "role" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "role" SET DEFAULT 'Developer'`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "joining_date"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address_line2"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address_line1"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "age" integer`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "line1" character varying NOT NULL`);
    }

}
