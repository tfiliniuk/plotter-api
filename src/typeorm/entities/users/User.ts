import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Site } from '../sites/Sites';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  first_name: string;

  @Column({
    nullable: true,
  })
  last_name: string;

  @Column({
    nullable: true,
    unique: true,
  })
  firebase_id: string;

  @OneToMany((_type) => Site, (site: Site) => site.user)
  sites: Array<Site>;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
