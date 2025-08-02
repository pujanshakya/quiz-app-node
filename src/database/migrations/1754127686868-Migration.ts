import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1754127686868 implements MigrationInterface {
    name = 'Migration1754127686868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "password" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "password"
        `);
    }

}
