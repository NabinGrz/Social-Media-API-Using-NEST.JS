import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  generateJWToken(payload): string {
    return this.jwtService.sign(payload);
  }
  extractUserIdFromToken(token: string): string | null {
    try {
      const decoded: any = jwt.decode(token);
      if (decoded && decoded.sub) {
        return decoded.sub;
      }
      return null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      } else {
        throw new BadRequestException('Invalid Credentials');
      }
    } else {
      return new NotFoundException('User Not Found');
    }
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.generateJWToken(payload),
    };
  }
}
