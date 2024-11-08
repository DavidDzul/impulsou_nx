import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';

import { CampusEnum } from './campus.entity';
import {
  Generation,
  Attendance,
  Photo,
  UserCertificate,
  Autorization,
} from './';

export enum RoleUser {
  STUDENT = 'STUDENT',
  GRADUATE = 'GRADUATE',
  BUSSINES = 'BUSINESS',
}

registerEnumType(RoleUser, {
  name: 'RoleUser',
});

@ObjectType()
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  enrollment?: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column({ unique: true, nullable: false })
  @Field()
  email: string;

  @Column({ nullable: false })
  @Field()
  password: string;

  @Column({ nullable: true })
  @Field({
    nullable: true,
  })
  phone?: string;

  @Column({ default: true })
  @Field()
  active: boolean;

  @Column({ type: 'enum', enum: CampusEnum })
  @Field(() => CampusEnum)
  campus: CampusEnum;

  @Column({ unsigned: true, nullable: true })
  @Field(() => Int, { nullable: true })
  generationId?: number;

  @Column({ type: 'enum', enum: RoleUser })
  @Field(() => RoleUser)
  role: RoleUser;

  @CreateDateColumn()
  @Field()
  createdAt: string;

  @UpdateDateColumn()
  @Field()
  updatedAt: string;

  /* Relationships */
  @ManyToOne(() => Generation, (generation) => generation.users)
  @Field(() => Generation)
  generation: Generation;

  @OneToMany(() => Attendance, (att) => att.user)
  @Field(() => Attendance, { nullable: true })
  attendances: Attendance;

  @OneToMany(() => Photo, (photo) => photo.user)
  @Field(() => [Photo], { nullable: true })
  photos: Photo[];

  @OneToMany(() => UserCertificate, (document) => document.user)
  @Field(() => [UserCertificate], { nullable: true })
  document: UserCertificate[];

  @OneToMany(() => Autorization, (autorization) => autorization.user)
  @Field(() => [Autorization], { nullable: true })
  autorization: Autorization[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith('$2b$10$')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
