import {
  CreateUserRequest,
  CreateUserResponse,
  GetUserByIdRequest,
  IUser,
  IUsersService,
  ListUsersRequest,
  usersGrpcClient,
}                             from '@mallowigi/common';
import { Injectable }         from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Observable }         from 'rxjs';

@Injectable()
export class UsersService implements IUsersService {
  @Client(usersGrpcClient)
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

  create(req: CreateUserRequest): Promise<CreateUserResponse<IUser>> {
    return this.grpcUsersService.create(req);
  }
}
