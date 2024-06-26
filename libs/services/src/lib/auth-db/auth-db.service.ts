import { Injectable, Logger } from '@nestjs/common';
import { AdminDbService } from '../admin-db';

import { Admin } from '@impulsou/models';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthDbService {
  private readonly logger = new Logger(AuthDbService.name);
  constructor(
    private readonly adminDbService: AdminDbService,
    private readonly jwtService: JwtService
  ) {}

  async validateAdmin(email: string, pass: string): Promise<Partial<Admin>> {
    try {
      const user = await this.adminDbService.findOne({
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

  async login(admin: Partial<Admin>): Promise<string> {
    const payload = {
      email: admin.email,
      id: admin.id,
    };
    return this.jwtService.sign(payload);
  }
}
