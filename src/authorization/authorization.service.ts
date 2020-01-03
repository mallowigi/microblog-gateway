import { authorizationGrpcClientOptions } from '@micro/common/dist/src';
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
}                                         from '@micro/common/src/types/authorization';
import { Injectable }                     from '@nestjs/common';
import { Client, ClientGrpc }             from '@nestjs/microservices';

interface GrpcAuthorizationService {
  can(data: CanRequest): Promise<CanResponse>;

  canOnInstance(req: CanOnInstanceRequest): Promise<CanOnInstanceResponse>;

  createRole(req: CreateRoleRequest): Promise<CreateRoleResponse<IRole>>;

  getRoles(req: GetRolesRequest): Promise<GetRolesResponse<IRole>>;
}

@Injectable()
export class AuthorizationService implements IRolesService<IRole> {
  @Client(authorizationGrpcClientOptions)
  private client: ClientGrpc;

  private grpcAuthorizationService: GrpcAuthorizationService;

  onModuleInit() {
    this.grpcAuthorizationService = this.client.getService<GrpcAuthorizationService>('RolesService');
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
