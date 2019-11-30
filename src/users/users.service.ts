import { usersGrpcClientOptions } from '@micro/common/dist/src';
import { Injectable }             from '@nestjs/common';
import { Client, ClientGrpc }     from '@nestjs/microservices';

@Injectable()
export class UsersService {
  @Client(usersGrpcClientOptions)
  private client: ClientGrpc;

  private grpcUsersService: UsersService;

  onModuleInit() {
    this.grpcUsersService = this.client.getService<UsersService>('UsersService');
  }

  async getUsers() {
    return this.grpcUsersService.getUsers();
  }
}
