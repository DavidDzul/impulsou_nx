import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthDbService, AdminDbService } from '@impulsou/services';
import { Logger, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Token, Admin, RoleEnum } from '@impulsou/models';
import { GqlAuthGuard } from '@impulsou/shared';
import { CurrentUser } from '@impulsou/shared';

@Resolver(() => Admin)
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name);
  constructor(
    private readonly authDbService: AuthDbService,
    private readonly adminDbService: AdminDbService
  ) {}

  @Query(() => Admin)
  @UseGuards(GqlAuthGuard)
  profile(@CurrentUser('user') user: Admin) {
    this.logger.log(`Admin with email: ${user.email} connected.`);
    return this.adminDbService.findOne({
      where: { id: user.id, role: RoleEnum.PSICOL },
    });
  }

  @Query(() => Admin)
  adminTest() {
    return this.adminDbService.findOne({ where: { id: 1 } });
  }

  @Mutation(() => Token)
  async login(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    const admin = await this.authDbService.validateAdmin(email, password);
    if (!admin) {
      throw new UnauthorizedException({
        status: 401,
        message:
          'El correo y/o contraseña es erronea. Verifique e intente nuevamente.',
      });
    }
    if (!admin.active) {
      throw new UnauthorizedException({
        status: 401,
        message:
          'El usuario se encuentra inactivo. Contacte al administrador para mas información.',
      });
    }
    this.logger.log(`User with email: ${email} logged in.`);
    const token: Token = { token: await this.authDbService.login(admin) };
    return token;
  }
}
