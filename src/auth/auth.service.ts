import { authGrpcClient, GetUserRequest, GetUserResponse, IAuthService, LoginRequest, LoginResponse } from '@mallowigi/common';
import { Injectable }                                                                                 from '@nestjs/common';
import { Client, ClientGrpc }                                                                         from '@nestjs/microservices';

@Injectable()
export class AuthService implements IAuthService {
  @Client(authGrpcClient)
  private client: ClientGrpc;

  private grpcAuthService: IAuthService;

  onModuleInit() {
    this.grpcAuthService = this.client.getService<IAuthService>('AuthService');
  }

  public getUser(req: GetUserRequest): Promise<GetUserResponse> {
    return this.grpcAuthService.getUser(req);
  }

  public login(req: LoginRequest): Promise<LoginResponse> {
    return this.grpcAuthService.login(req);
  }

}
