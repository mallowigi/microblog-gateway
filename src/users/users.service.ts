import { Pagination, Query, usersGrpcClientOptions } from '@micro/common/dist/src';
import { Injectable }                                from '@nestjs/common';
import { Client, ClientGrpc }                        from '@nestjs/microservices';
import { Observable }                                from 'rxjs';

export interface User {
  id: number;
  username: string;
  password: string;
}

interface GrpcUsersService {
  list(data: { query: Query, pagination: Pagination }): Observable<User>;

  get();

  create();
}

@Injectable()
export class UsersService {
  @Client(usersGrpcClientOptions)
  private client: ClientGrpc;

  private grpcUsersService: GrpcUsersService;

  onModuleInit() {
    this.grpcUsersService = this.client.getService<GrpcUsersService>('UsersService');
  }

  getUsers({ query, pagination }) {
    return this.grpcUsersService.list({ query, pagination });
  }
}
