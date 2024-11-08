import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthDbService, UsersDbService } from '@impulsou/services';
import { Logger, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Token, Admin } from '@impulsou/models';
import { GqlAuthGuard } from '@impulsou/shared';
import { CurrentUser } from '@impulsou/shared';

@Resolver(() => Admin)
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name);
  constructor(
    private readonly authDbService: AuthDbService,
    private readonly usersDbService: UsersDbService
  ) {}

  @Query(() => Admin)
  @UseGuards(GqlAuthGuard)
  profile(@CurrentUser('user') user: Admin) {
    this.logger.log(`Admin with email: ${user.email} connected.`);
    return this.usersDbService.findOne({ where: { id: user.id } });
  }

  @Mutation(() => Token)
  async login(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    const user = await this.authDbService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException({
        status: 401,
        message:
          'El correo y/o contraseña es erronea. Verifique e intente nuevamente.',
      });
    }
    if (!user.active) {
      throw new UnauthorizedException({
        status: 401,
        message:
          'El usuario se encuentra inactivo. Contacte al administrador para mas información.',
      });
    }
    this.logger.log(`User with email: ${email} logged in.`);
    const token: Token = { token: await this.authDbService.loginUser(user) };
    return token;
  }
}
