import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Site } from '../sites/Sites';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @OneToMany(() => Site, (site: Site) => site.client)
  sites!: Array<Site>;

  @Column()
  created_on: string;
}
