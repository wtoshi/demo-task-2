import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.enableCors({ origin: '*' });
  await app.listen(5002);
}
bootstrap();
