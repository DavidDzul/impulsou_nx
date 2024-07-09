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
@Entity('images')
export class Photo {
  @PrimaryGeneratedColumn({ unsigned: true })
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  userId: number;

  @Column()
  @Field()
  url: string;

  @Column({ default: false })
  @Field()
  admin: boolean;

  @CreateDateColumn()
  @Field()
  createdAt: string;

  /* Relationships */
  @ManyToOne(() => User, (user) => user.photos)
  user: User;
}
