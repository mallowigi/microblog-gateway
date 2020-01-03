import { GetRolesResponse, IRole } from '@micro/common/src/types/authorization';
import { Controller, Get, Param }  from '@nestjs/common';
import { AuthorizationService }    from 'src/authorization/authorization.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: AuthorizationService) {

  }

  @Get(':userId')
  public async getRoles(@Param('userId') userId: string): Promise<GetRolesResponse<IRole>> {
    return await this.rolesService.getRoles({ userId });
  }

  // @Get(':id')
  // public async getRole(@Param('id') id: string): Promise<IRole> {
  //   return this.rolesService.get({ id });
  // }
  //
  // @Post()
  // public async createRole(@Body() user: CreateUserRequest<IRole>): Promise<CreateUserResponse<IRole>> {
  //   return this.rolesService.create(user);
  // }
}
