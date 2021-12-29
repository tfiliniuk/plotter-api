import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable } from 'typeorm';

import { Site } from '../sites/Sites';

@Entity('site_templates')
export class SiteTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  theme: string;

  @Column({ nullable: true })
  userId!: number;

  @ManyToMany(() => Site, (site: Site) => site.templates)
  @JoinTable({
    name: 'site_template',
    joinColumn: {
      name: 'template_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'site_id',
      referencedColumnName: 'id',
    },
  })
  sites: Array<Site>;
}
