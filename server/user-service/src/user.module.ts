import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL), // Veritabanı bağlantısı
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Model Tanımı
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret_key',
      signOptions: { expiresIn: '60m' },
    }),
    PassportModule,
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
