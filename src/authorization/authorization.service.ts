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
}                                        from '@mallowigi/common';
import { Injectable }                    from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join }                          from 'path';

@Injectable()
export class AuthorizationService implements IRolesService<IRole> {
  @Client({
    transport: Transport.GRPC,
    options:   {
      url:       '0.0.0.0:50052',
      package:   'service',
      protoPath: join(__dirname, '../../../common/proto/authorization/service.proto'),
    },
  })
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
