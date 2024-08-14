// NestJS Modules
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
// Third-Party Libraries
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

// Entities
import { User } from '.';

export enum StatusAutorizationEmun {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  GRADUATE = 'GRADUATE',
  DETAINED = 'DETAINED',
}

registerEnumType(StatusAutorizationEmun, {
  name: 'StatusAutorizationEmun',
});

export enum CauseEmun {
  FAULTS = 'FAULTS',
  NOTCONSTANCY = 'NOTCONSTANCY',
  PROVGRADES = 'PROVGRADES',
  ORIGRADES = 'ORIGRADES',
  LOWAVERAGE = 'LOWAVERAGE',
  EXTRAORDINARY = 'EXTRAORDINARY',
  PERSONALSCHOOL = 'PERSONALSCHOOL',
  VOCATIONALSCHOOL = 'VOCATIONALSCHOOL',
  MISSING = 'MISSING',
  BREAKRULES = 'BREAKRULES',
  OTHER = 'OTHER',
}

registerEnumType(CauseEmun, {
  name: 'CauseEmun',
});

@ObjectType()
@Entity('autorization')
export class Autorization {
  @PrimaryGeneratedColumn({ unsigned: true })
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  userId: number;

  @Column({ type: 'enum', enum: StatusAutorizationEmun })
  @Field(() => StatusAutorizationEmun)
  status: StatusAutorizationEmun;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  percentage?: number;

  @Column({ default: false })
  @Field()
  previousPayment: boolean;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  numberMonths?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  previousMonths?: string;

  @Column({ type: 'enum', enum: CauseEmun, nullable: true })
  @Field(() => CauseEmun, { nullable: true })
  cause?: CauseEmun;

  @Column({ type: 'nvarchar', length: '10000', nullable: true })
  @Field({ nullable: true })
  otherCause?: string;

  @Column({ type: 'date' })
  @Field()
  date: string;

  @CreateDateColumn()
  @Field()
  createdAt: string;

  @UpdateDateColumn()
  @Field()
  updatedAt: string;

  /* Relationships */
  @ManyToOne(() => User, (user) => user.autorization)
  @Field(() => User)
  user: User;
}
