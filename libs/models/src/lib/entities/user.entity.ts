import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';

export enum UserTypeEnum {
  STUDENT = 'STUDENT',
  GRADUATE = 'GRADUATE',
}

export enum CampusEnum {
  MERIDA = 'MERIDA',
  VALLADOLID = 'VALLADOLID',
  TIZIMIN = 'TIZIMIN',
  OXKUTZCAB = 'OXKUTZCAB',
}

registerEnumType(UserTypeEnum, {
  name: 'UserTypeEnum',
});

registerEnumType(CampusEnum, {
  name: 'CampusEnum',
});
@ObjectType()
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

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

  @Column()
  @Field()
  enrollment: string;

  @Column({ nullable: true })
  @Field({
    nullable: true,
  })
  phone?: string;

  @Column({ default: true })
  @Field()
  active: boolean;

  @Column({ type: 'enum', enum: CampusEnum, nullable: true })
  @Field(() => CampusEnum, {
    nullable: true,
  })
  campus: CampusEnum;

  @Column({ type: 'enum', enum: UserTypeEnum, nullable: true })
  @Field(() => UserTypeEnum, {
    nullable: true,
  })
  role: UserTypeEnum;

  @CreateDateColumn()
  @Field()
  createdAt: string;

  @UpdateDateColumn()
  @Field()
  updatedAt: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith('$2b$10$')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
