import { CanOnInstanceRequest, CanRequest } from '@mallowigi/common';
import { AuthorizationService }             from '@mallowigi/gateway/src/authorization/authorization.service';
import { Controller, Get }                  from '@nestjs/common';

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
