import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
  sites: Array<Site>;
}
