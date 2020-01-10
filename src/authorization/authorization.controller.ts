import { CanOnInstanceRequest }   from '@mallowigi/common';
import { AuthorizationService }   from '@mallowigi/gateway/src/authorization/authorization.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('authorization')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {

  }

  @Get('can')
  public async can(@Query('userId') userId: string,
                   @Query('action') action: string,
                   @Query('subject') subject: string) {
    return this.authorizationService.can({ action, subject, userId });
  }

  @Get('canOnInstance')
  public async canOnInstance(req: CanOnInstanceRequest) {
    return this.authorizationService.canOnInstance(req);
  }
}
