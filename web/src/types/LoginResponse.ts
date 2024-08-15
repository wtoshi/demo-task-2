import { User } from './User';

export interface LoginResponse {
  accessToken: string;  // JWT token
  user: User;        // Kullanıcı bilgilerini içeren DTO
}
