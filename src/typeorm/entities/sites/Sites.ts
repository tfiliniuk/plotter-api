import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Client } from '../clients/Client';
import { SiteTemplate } from '../templates/Template';
import { User } from '../users/User';

@Entity('sites')
export class Site {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, (client: Client) => client.sites)
  @JoinColumn({
    name: 'client_id',
  })
  client!: Client;

  @Column()
  name: string;

  @Column()
  domain: string;

  @ManyToMany(() => SiteTemplate, (template: SiteTemplate) => template.sites)
  @JoinTable()
  templates: Array<SiteTemplate>;

  @Column()
  created_on: string;

  @ManyToOne(() => User, (user: User) => user.sites)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
