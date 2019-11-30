import { Controller, Get } from '@nestjs/common';
import { UsersService }    from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {

  }

  @Get()
  public async getUsers() {
    return await this.usersService.getUsers();
  }
}
