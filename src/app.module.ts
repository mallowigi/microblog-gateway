import { Module }                  from '@nestjs/common';
import { AuthorizationController } from './authorization/authorization.controller';
import { AuthorizationService }    from './authorization/authorization.service';
import { RolesController }         from './roles/roles.controller';
import { UsersController }         from './users/users.controller';
import { UsersService }            from './users/users.service';

@Module({
  imports:     [],
  controllers: [UsersController, AuthorizationController, RolesController],
  providers:   [UsersService, AuthorizationService],
})
export class AppModule {}
