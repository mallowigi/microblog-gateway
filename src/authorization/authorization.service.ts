import { authorizationGrpcClientOptions }                                       from '@micro/common/dist/src';
import { CanOnInstanceRequest, CanOnInstanceResponse, CanRequest, CanResponse } from '@micro/common/src/types/authorization';
import { Injectable }                                                           from '@nestjs/common';
import { Client, ClientGrpc }                                                   from '@nestjs/microservices';

interface GrpcAuthorizationService {
  can(data: CanRequest): CanResponse;

  canOnInstance(req: CanOnInstanceRequest): CanOnInstanceResponse;
}

@Injectable()
export class AuthorizationService {
  @Client(authorizationGrpcClientOptions)
  private client: ClientGrpc;

  private grpcAuthorizationService: GrpcAuthorizationService;

  onModuleInit() {
    this.grpcAuthorizationService = this.client.getService<GrpcAuthorizationService>('RolesService');
  }

  public can(req: CanRequest): CanResponse {
    return this.grpcAuthorizationService.can(req);
  }

  public canOnInstance(req: CanOnInstanceRequest): CanOnInstanceResponse {
    return this.grpcAuthorizationService.canOnInstance(req);
  }
}
