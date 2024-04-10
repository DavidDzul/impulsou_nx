import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDbService } from '../auth-db.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authDbService: AuthDbService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authDbService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}