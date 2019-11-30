import { Controller, Get, Param } from '@nestjs/common';
import { UsersService }           from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {

  }

  @Get()
  public async getUsers(@Param('authorId') authorId: string,
                        @Param('page') page: number,
                        @Param('limit') limit: number) {
    return this.usersService.getUsers({
      query:      { authorId },
      pagination: { page, limit },
    });
  }
}
