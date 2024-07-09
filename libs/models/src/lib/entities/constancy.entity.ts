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

@ObjectType()
@Entity('study-certificate')
export class Constancy {
  @PrimaryGeneratedColumn({ unsigned: true })
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field(() => Int)
  userId: number;

  @Column()
  @Field()
  url: string;

  @Column({ nullable: true })
  @Field()
  fileId: string;

  @Column({ type: 'date' })
  @Field()
  startDate: string;

  @Column({ type: 'date' })
  @Field()
  endDate: string;

  @CreateDateColumn()
  @Field()
  createdAt: string;

  /* Relationships */
  @ManyToOne(() => User, (user) => user.constancy)
  user: User;
}
