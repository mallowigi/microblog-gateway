import { CreateUserRequest, CreateUserResponse, IUser } from '@micro/common/src/types/users';
import { Body, Controller, Get, Param, Post }           from '@nestjs/common';
import { Observable }                                   from 'rxjs';
import { reduce }                                       from 'rxjs/operators';
import { UsersService }                                 from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {

  }

  @Get()
  public async getUsers(@Param('authorId') authorId: string,
                        @Param('page') page: number,
                        @Param('limit') limit: number): Promise<Observable<IUser[]>> {
    return this.usersService
               .list({
                 query:      { authorId },
                 pagination: { page, limit },
               })
               .pipe(reduce<IUser, IUser[]>((acc, curr) => [curr, ...acc], []));
  }

  @Get(':id')
  public async getUser(@Param('id') id: string): Promise<IUser> {
    return this.usersService.get({ id });
  }

  @Post()
  public async createUser(@Body() user: CreateUserRequest<IUser>): Promise<CreateUserResponse<IUser>> {
    return this.usersService.create(user);
  }
}
