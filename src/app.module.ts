import { AuthorizationController } from '@mallowigi/gateway/src/authorization/authorization.controller';
import { AuthorizationService }    from '@mallowigi/gateway/src/authorization/authorization.service';
import { clientsProviders }        from '@mallowigi/gateway/src/clients.provider';
import { RolesController }         from '@mallowigi/gateway/src/roles/roles.controller';
import { UsersController }         from '@mallowigi/gateway/src/users/users.controller';
import { UsersService }            from '@mallowigi/gateway/src/users/users.service';
import { Module }                  from '@nestjs/common';

@Module({
  imports:     [],
  controllers: [UsersController, AuthorizationController, RolesController],
  providers:   [...clientsProviders, UsersService, AuthorizationService],
})
export class AppModule {}
