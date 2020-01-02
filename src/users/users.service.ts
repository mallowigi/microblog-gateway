import { Pagination, Query, usersGrpcClientOptions } from '@micro/common/dist/src';
import { Injectable }                                from '@nestjs/common';
import { Client, ClientGrpc }                        from '@nestjs/microservices';
import { Observable }                                from 'rxjs';
import { map }                                       from 'rxjs/operators';

export interface User {
  id: number;
  username: string;
  password: string;
}

interface GrpcUsersService {
  list(data: { query: Query, pagination: Pagination }): Observable<User>;

  get(data: { id: string }): User;

  create(data: { password: string; username: string }): Observable<User>;
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

  getUser({ id }) {
    return this.grpcUsersService.get({ id });
  }

  createUser({ username, password }) {
    return this.grpcUsersService.create({ username, password })
               .pipe(map((x: any) => x.user));
  }
}
