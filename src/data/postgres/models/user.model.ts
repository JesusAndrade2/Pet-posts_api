import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PetPost } from './pet-post.model';

export enum UserRol {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 70,
    nullable: false,
  })
  name: string;

  @Column('varchar', { length: 100, unique: true, nullable: false })
  email: string;

  @Column('varchar', { length: 255, nullable: false })
  password: string;

  @Column('enum', {
    nullable: false,
    enum: UserRol,
    default: UserRol.USER,
  })
  role: UserRol;

  @Column('boolean', { default: false, nullable: false })
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => PetPost, (pet_post) => pet_post.user)
  pet_post: PetPost[];
}
