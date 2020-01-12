import { clientsProviders }        from '@mallowigi/common';
import { ArticlesController }      from '@mallowigi/gateway/src/articles/articles.controller';
import { ArticlesService }         from '@mallowigi/gateway/src/articles/articles.service';
import { AuthController }          from '@mallowigi/gateway/src/auth/auth.controller';
import { AuthService }             from '@mallowigi/gateway/src/auth/auth.service';
import { AuthorizationController } from '@mallowigi/gateway/src/authorization/authorization.controller';
import { AuthorizationService }    from '@mallowigi/gateway/src/authorization/authorization.service';
import { CommentsController }      from '@mallowigi/gateway/src/comments/comments.controller';
import { CommentsService }         from '@mallowigi/gateway/src/comments/comments.service';
import { RolesController }         from '@mallowigi/gateway/src/roles/roles.controller';
import { UsersController }         from '@mallowigi/gateway/src/users/users.controller';
import { UsersService }            from '@mallowigi/gateway/src/users/users.service';
import { Module }                  from '@nestjs/common';

@Module({
  imports:     [],
  controllers: [UsersController, AuthorizationController, RolesController, AuthController, ArticlesController, CommentsController],
  providers:   [...clientsProviders, UsersService, AuthorizationService, AuthService, ArticlesService, CommentsService],
})
export class AppModule {}
