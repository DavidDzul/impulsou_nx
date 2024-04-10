import { Injectable, Logger } from '@nestjs/common';
import { UsersDbService } from '../users-db';

import { User } from '@impulsou/models';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthDbService {
  private readonly logger = new Logger(AuthDbService.name);
  constructor(
    private readonly usersDbService: UsersDbService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<Partial<User>> {
    try {
      const user = await this.usersDbService.findOne({
        where: { email },
        select: ['id', 'email', 'password', 'active'],
      });
      const passOk = await bcrypt.compare(pass, user.password);
      if (user && passOk) {
        this.logger.log(`User with email: ${email} validated.`);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
      this.logger.log(`User with email: ${email} fail validation.`);
      return null;
    } catch (e) {
      this.logger.log(`User with email: ${email} fail validation.`);
      return null;
    }
  }

  async login(user: Partial<User>): Promise<string> {
    const payload = {
      email: user.email,
      id: user.id,
    };
    return this.jwtService.sign(payload);
  }
}
