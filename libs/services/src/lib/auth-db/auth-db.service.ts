import { Injectable, Logger } from '@nestjs/common';
import { AdminDbService } from '../admin-db';
import { UsersDbService } from '../users-db';

import { Admin, User } from '@impulsou/models';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthDbService {
  private readonly logger = new Logger(AuthDbService.name);
  constructor(
    private readonly adminDbService: AdminDbService,
    private readonly jwtService: JwtService,
    private readonly usersDbService: UsersDbService
  ) {}

  async validateAdmin(email: string, pass: string): Promise<Partial<Admin>> {
    try {
      const admin = await this.adminDbService.findOne({
        where: { email },
        select: ['id', 'email', 'password', 'active', 'campus'],
      });
      const passOk = await bcrypt.compare(pass, admin.password);
      if (admin && passOk) {
        this.logger.log(`Admin with email: ${email} validated.`);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = admin;
        return result;
      }
      this.logger.log(`Admin with email: ${email} fail validation.`);
      return null;
    } catch (e) {
      this.logger.log(`Admin with email: ${email} fail validation.`);
      return null;
    }
  }

  async validateUser(email: string, pass: string): Promise<Partial<User>> {
    try {
      const user = await this.usersDbService.findOne({
        where: { email },
        select: ['id', 'email', 'password', 'active', 'role', 'campus'],
      });
      const passOk = await bcrypt.compare(pass, user.password);
      if (user && passOk) {
        this.logger.log(`User with email: ${user.email} validated.`);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
      this.logger.log(`User with email: ${user.email} fail validation.`);
      return null;
    } catch (e) {
      this.logger.log(`User with email: ${email} fail validation.`);
      return null;
    }
  }

  async login(admin: Partial<Admin>): Promise<string> {
    const payload = {
      email: admin.email,
      id: admin.id,
      campus: admin.campus,
    };
    return this.jwtService.sign(payload);
  }

  async loginUser(user: Partial<User>): Promise<string> {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      campus: user.campus,
    };
    return this.jwtService.sign(payload);
  }
}
