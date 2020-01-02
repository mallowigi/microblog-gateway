import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Observable }                         from 'rxjs';
import { reduce }                             from 'rxjs/operators';
import { User, UsersService }                 from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {

  }

  @Get()
  public async getUsers(@Param('authorId') authorId: string,
                        @Param('page') page: number,
                        @Param('limit') limit: number): Promise<Observable<User[]>> {
    return this.usersService.getUsers({
      query:      { authorId },
      pagination: { page, limit },
    }).pipe(reduce<User, User[]>((acc, curr) => [curr, ...acc], []));
  }

  @Get(':id')
  public async getUser(@Param('id') id: string) {
    return this.usersService.getUser({ id });
  }

  @Post()
  public async createUser(@Body() user: { username: string, password: string }) {
    return this.usersService.createUser(user);
  }
}
