import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum PetPostStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
export class PetPost extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 70,
    nullable: false,
  })
  pet_name: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
    default:
      'https://img.freepik.com/vector-gratis/cute-dog-logo_1051-3349.jpg?semt=ais_hybrid&w=740',
  })
  image_url: string;

  @Column('enum', {
    nullable: false,
    enum: PetPostStatus,
    default: PetPostStatus.PENDING,
  })
  status: PetPostStatus;

  @Column('varchar', {
    length: 70,
    nullable: false,
  })
  owner: string;

  @Column('boolean', {
    default: false,
    nullable: false,
  })
  hasFound: boolean;

  @CreateDateColumn()
  create_at: Date;
}
