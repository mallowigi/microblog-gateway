import { CreateRoleRequest, CreateRoleResponse, GetRolesResponse, IRole } from '@mallowigi/common';
import { AuthorizationService }                                           from '@mallowigi/gateway/src/authorization/authorization.service';
import { Body, Controller, Get, Param, Post }                             from '@nestjs/common';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: AuthorizationService) {

  }

  @Get(':userId')
  public async getRoles(@Param('userId') userId: string): Promise<GetRolesResponse<IRole>> {
    return await this.rolesService.getRoles({ userId });
  }

  @Post()
  public async createRole(@Body() role: CreateRoleRequest): Promise<CreateRoleResponse<IRole>> {
    return this.rolesService.createRole(role);
  }
}
