import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JWTStrategy } from './jwt.strategy';
import { UsersModule } from 'src/user/users.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: '8nd8dnfFNd3JD893d92hf09ddasldh',
      signOptions: {
        expiresIn: '2d',
        algorithm: 'HS256',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [JWTStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
