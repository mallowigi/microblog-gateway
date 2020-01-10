import {
  CanOnInstanceRequest,
  CanOnInstanceResponse,
  CanRequest,
  CanResponse,
  CreateRoleRequest,
  CreateRoleResponse,
  GetRolesRequest,
  GetRolesResponse,
  IRole,
  IRolesService,
}                                  from '@mallowigi/common';
import { authorizationGrpcClient } from '@mallowigi/gateway/src/clients.provider';
import { Injectable }              from '@nestjs/common';
import { Client, ClientGrpc }      from '@nestjs/microservices';

@Injectable()
export class AuthorizationService implements IRolesService<IRole> {
  @Client(authorizationGrpcClient)
  private client: ClientGrpc;

  private grpcAuthorizationService: IRolesService<IRole>;

  onModuleInit() {
    this.grpcAuthorizationService = this.client.getService<IRolesService<IRole>>('RolesService');
  }

  public can(req: CanRequest): Promise<CanResponse> {
    return this.grpcAuthorizationService.can(req);
  }

  public canOnInstance(req: CanOnInstanceRequest): Promise<CanOnInstanceResponse> {
    return this.grpcAuthorizationService.canOnInstance(req);
  }

  public createRole(req: CreateRoleRequest): Promise<CreateRoleResponse<IRole>> {
    return this.grpcAuthorizationService.createRole(req);
  }

  public getRoles(req: GetRolesRequest): Promise<GetRolesResponse<IRole>> {
    return this.grpcAuthorizationService.getRoles(req);
  }
}
