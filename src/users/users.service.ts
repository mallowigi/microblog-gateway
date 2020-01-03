import { usersGrpcClientOptions }                                                                        from '@micro/common/dist/src';
import { CreateUserRequest, CreateUserResponse, GetUserRequest, IUser, IUsersService, ListUsersRequest } from '@micro/common/src/types/users';
import { Injectable }                                                                                    from '@nestjs/common';
import { Client, ClientGrpc }                                                                            from '@nestjs/microservices';
import { Observable }                                                                                    from 'rxjs';

interface GrpcUsersService {
  list(data: ListUsersRequest): Observable<IUser>;

  get(data: GetUserRequest): Promise<IUser>;

  create(data: CreateUserRequest<IUser>): Promise<CreateUserResponse<IUser>>;
}

@Injectable()
export class UsersService implements IUsersService {
  @Client(usersGrpcClientOptions)
  private client: ClientGrpc;

  private grpcUsersService: GrpcUsersService;

  onModuleInit() {
    this.grpcUsersService = this.client.getService<GrpcUsersService>('UsersService');
  }

  list(req: ListUsersRequest): Observable<IUser> {
    return this.grpcUsersService.list(req);
  }

  get(req: GetUserRequest): Promise<IUser> {
    return this.grpcUsersService.get(req);
  }

  create(req: CreateUserRequest<IUser>): Promise<CreateUserResponse<IUser>> {
    return this.grpcUsersService.create(req);
  }
}
