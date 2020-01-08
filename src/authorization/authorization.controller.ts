import { Controller, Get }                  from '@nestjs/common';
import { AuthorizationService }             from 'src/authorization/authorization.service';
import { CanRequest, CanOnInstanceRequest } from '@mallowigi/common';

@Controller('authorization')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {

  }

  @Get('can')
  public async can(req: CanRequest) {
    return this.authorizationService.can(req);
  }

  @Get('canOnInstance')
  public async canOnInstance(req: CanOnInstanceRequest) {
    return this.authorizationService.canOnInstance(req);
  }
}
