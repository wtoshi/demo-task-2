import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';
import { JwtStrategy } from './jwt.strategy';
import { FlightSchema } from './schemas/flight.schema';
import { DestinationSchema } from './schemas/destination.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL), // MongoDB bağlantısını başlatır
    MongooseModule.forFeature([{ name: 'Flight', schema: FlightSchema }]), // Flight modelini tanımlar
    MongooseModule.forFeature([
      { name: 'Destination', schema: DestinationSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret_key',
      signOptions: { expiresIn: '60m' },
    }),
    PassportModule,
  ],
  providers: [FlightService, JwtStrategy],
  controllers: [FlightController],
})
export class FlightModule {}
