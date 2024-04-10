import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@impulsou/models';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersResolver],
})
export class UsersModule {}
