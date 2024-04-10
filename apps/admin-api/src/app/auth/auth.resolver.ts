import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthDbService, UsersDbService } from '@impulsou/services';
import { RegisterUserInput } from './dto';
import {
  BadRequestException,
  Logger,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Token, User } from '@impulsou/models';
import { GqlAuthGuard } from './guards/';
import { CurrentUser } from './decorators';

@Resolver(() => User)
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name);
  constructor(
    private readonly authDbService: AuthDbService,
    private readonly usersDbService: UsersDbService
  ) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  profile(@CurrentUser('user') user: User) {
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
    const token: Token = { token: await this.authDbService.login(user) };
    return token;
  }

  @Mutation(() => String)
  async register(
    @Args('registerUserInput') registerUserInput: RegisterUserInput
  ) {
    if (
      await this.usersDbService.findOne(
        { where: { email: registerUserInput.email } },
        false
      )
    ) {
      this.logger.log('Register User Fail: Duplicate Email');
      throw new BadRequestException({
        status: 400,
        message: 'Error',
      });
    }
    const user = await this.usersDbService.create(registerUserInput);
    this.logger.log(`User with email: ${user.email} created.`);
    return 'Registro realizado con éxito.';
  }
}
