import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  async register(registerDto: RegisterDto): Promise<any> {
    const { username, password } = registerDto;

    try {
      const response = this.httpService.post(
        'http://user-service:5002/user/register',
        {
          username,
          password,
        },
      );

      const user = await lastValueFrom(response);
      return {
        user: user.data,
        accessToken: this.jwtService.sign({
          username: user.data.username,
          sub: user.data._id,
        }),
      };
    } catch (error) {
      throw new UnauthorizedException('Registration failed');
    }
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string; user: any }> {
    const { username, password } = loginDto;

    try {
      const response = this.httpService.get(`http://user-service:5002/user`, {
        params: {
          username,
          password,
        },
      });
      const user = await lastValueFrom(response);

      if (!user || !(await bcrypt.compare(password, user.data.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { username: user.data.username, sub: user.data._id };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken: accessToken, user: user.data };
    } catch (error) {
      throw new UnauthorizedException('Login failed');
    }
  }
}
