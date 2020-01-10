import { AppModule }      from '@mallowigi/gateway/src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory }    from '@nestjs/core';
import * as compression   from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(compression());
  await app.listen(3000);
}

bootstrap();
