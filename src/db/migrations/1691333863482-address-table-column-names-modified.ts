import { MigrationInterface, QueryRunner } from "typeorm";

export class AddressTableColumnNamesModified1691333863482 implements MigrationInterface {
    name = 'AddressTableColumnNamesModified1691333863482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_678a3540f843823784b0fe4a4f2"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "department_id"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address_line1"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address_line2"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "department_id_id" integer`);
        await queryRunner.query(`ALTER TABLE "address" ADD "address_line_1" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "address_line_2" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "joining_date"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "joining_date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_3b80acaf3052672f7196c04de9e" FOREIGN KEY ("department_id_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_3b80acaf3052672f7196c04de9e"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "joining_date"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "joining_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address_line_2"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address_line_1"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "department_id_id"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "address_line2" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "address_line1" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "department_id" integer`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_678a3540f843823784b0fe4a4f2" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
