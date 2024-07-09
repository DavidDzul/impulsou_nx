import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDbService } from '../auth-db.service';
import { Admin } from '@impulsou/models';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authDbService: AuthDbService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  // async validate(email: string, password: string): Promise<Partial<Admin>> {
  //   return await this.authDbService.validateAdmin(email, password);
  // }

  async validate(username: string, password: string): Promise<Partial<Admin>> {
    const admin = await this.authDbService.validateAdmin(username, password);
    if (!admin) {
      throw new UnauthorizedException();
    }
    return admin;
  }
}
