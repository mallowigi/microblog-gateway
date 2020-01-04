import { CreateRoleRequest, CreateRoleResponse, GetRolesResponse, IRole } from '@micro/common/src/types/authorization';
import { Body, Controller, Get, Param, Post }                             from '@nestjs/common';
import { AuthorizationService }                                           from 'src/authorization/authorization.service';

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
