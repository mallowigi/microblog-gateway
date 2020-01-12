import { CreateUserRequest, CreateUserResponse, IUser } from '@mallowigi/common';
import { UsersService }                                 from '@mallowigi/gateway/src/users/users.service';
import { Body, Controller, Get, Param, Post }           from '@nestjs/common';
import { Observable }                                   from 'rxjs';
import { reduce }                                       from 'rxjs/operators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {

  }

  @Get()
  public async getUsers(@Param('authorId') authorId: string,
                        @Param('page') page: number,
                        @Param('limit') limit: number): Promise<Observable<IUser[]>> {
    const userObservable = await this.usersService.list({
      query:      { authorId },
      pagination: { page, limit },
    });

    // consume observable
    return userObservable.pipe(reduce<IUser, IUser[]>((acc, curr) => [curr, ...acc], []));
  }

  @Get(':id')
  public async getUser(@Param('id') id: string): Promise<IUser> {
    return this.usersService.get({ id });
  }

  @Post()
  public async createUser(@Body() user: CreateUserRequest): Promise<CreateUserResponse<IUser>> {
    return this.usersService.create(user);
  }
}
