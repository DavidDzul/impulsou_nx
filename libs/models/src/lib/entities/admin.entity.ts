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

export enum RoleEnum {
  ADMIN = 'ADMIN',
  PSICOL = 'PSICOL',
}

registerEnumType(RoleEnum, {
  name: 'RoleEnum',
});

@ObjectType()
@Entity('admins')
export class Admin {
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

  @Column({ default: true })
  @Field()
  active: boolean;

  @Column({ type: 'enum', enum: RoleEnum, nullable: true })
  @Field(() => RoleEnum, {
    nullable: true,
  })
  role?: RoleEnum;

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
