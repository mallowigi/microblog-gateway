import { CreateUserRequest, CreateUserResponse, GetUserByIdRequest, IUser, IUsersService, ListUsersRequest } from '@mallowigi/common';
import { Injectable }                                                                                        from '@nestjs/common';
import { Client, ClientGrpc, Transport }                                                                     from '@nestjs/microservices';
import { join }                                                                                              from 'path';
import { Observable }                                                                                        from 'rxjs';

@Injectable()
export class UsersService implements IUsersService {
  @Client({
    transport: Transport.GRPC,
    options:   {
      url:       '0.0.0.0:50053',
      package:   'service',
      protoPath: join(__dirname, '../../../common/proto/users/service.proto'),
    },
  })
  private client: ClientGrpc;

  private grpcUsersService: IUsersService;

  onModuleInit() {
    this.grpcUsersService = this.client.getService<IUsersService>('UsersService');
  }

  list(req: ListUsersRequest): Promise<Observable<IUser>> {
    return this.grpcUsersService.list(req);
  }

  get(req: GetUserByIdRequest): Promise<IUser> {
    return this.grpcUsersService.get(req);
  }

  create(req: CreateUserRequest<IUser>): Promise<CreateUserResponse<IUser>> {
    return this.grpcUsersService.create(req);
  }
}
