import { Injectable }                     from '@nestjs/common';
import { Client, ClientGrpc }             from '@nestjs/microservices';
import {
  IRolesService,
  authorizationGrpcClientOptions,
  IRole,
  CanRequest,
  CanResponse,
  CanOnInstanceRequest, CanOnInstanceResponse, CreateRoleRequest, CreateRoleResponse, GetRolesRequest, GetRolesResponse,
} from '@mallowigi/common';

@Injectable()
export class AuthorizationService implements IRolesService<IRole> {
  @Client(authorizationGrpcClientOptions)
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
