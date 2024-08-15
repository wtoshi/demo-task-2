import { NestFactory } from '@nestjs/core';
import { FlightModule } from './flight.module';

async function bootstrap() {
  const app = await NestFactory.create(FlightModule);
  app.enableCors({ origin: '*' });
  await app.listen(5003);
}
bootstrap();
