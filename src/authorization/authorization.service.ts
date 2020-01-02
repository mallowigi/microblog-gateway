import { usersGrpcClientOptions }                                               from '@micro/common/dist/src';
import { CanOnInstanceRequest, CanOnInstanceResponse, CanRequest, CanResponse } from '@micro/common/types/authorization';
import { Injectable }                                                           from '@nestjs/common';
import { Client, ClientGrpc }                                                   from '@nestjs/microservices';

interface GrpcAuthorizationService {
  can(data: CanRequest): CanResponse;

  canOnInstance(req: CanOnInstanceRequest): CanOnInstanceResponse;
}

@Injectable()
export class AuthorizationService {
  @Client(usersGrpcClientOptions)
  private client: ClientGrpc;

  private grpcAuthorizationService: GrpcAuthorizationService;

  onModuleInit() {
    this.grpcAuthorizationService = this.client.getService<GrpcAuthorizationService>('AuthorizationService');
  }

  public can(req: CanRequest): CanResponse {
    return this.grpcAuthorizationService.can(req);
  }

  public canOnInstance(req: CanOnInstanceRequest): CanOnInstanceResponse {
    return this.grpcAuthorizationService.canOnInstance(req);
  }
}
