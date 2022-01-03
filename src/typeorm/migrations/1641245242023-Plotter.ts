import { MigrationInterface, QueryRunner } from 'typeorm';

export class Plotter1641245242023 implements MigrationInterface {
  name = 'Plotter1641245242023';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "site_template" DROP CONSTRAINT "FK_793c3b06e4bafbc455adcfca7a3"`);
    await queryRunner.query(`ALTER TABLE "site_template" DROP CONSTRAINT "FK_b6287622cafab532b235a2bb512"`);
    await queryRunner.query(
      `ALTER TABLE "site_template" ADD CONSTRAINT "FK_793c3b06e4bafbc455adcfca7a3" FOREIGN KEY ("template_id") REFERENCES "site_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "site_template" ADD CONSTRAINT "FK_b6287622cafab532b235a2bb512" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "site_template" DROP CONSTRAINT "FK_b6287622cafab532b235a2bb512"`);
    await queryRunner.query(`ALTER TABLE "site_template" DROP CONSTRAINT "FK_793c3b06e4bafbc455adcfca7a3"`);
    await queryRunner.query(
      `ALTER TABLE "site_template" ADD CONSTRAINT "FK_b6287622cafab532b235a2bb512" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "site_template" ADD CONSTRAINT "FK_793c3b06e4bafbc455adcfca7a3" FOREIGN KEY ("template_id") REFERENCES "site_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
