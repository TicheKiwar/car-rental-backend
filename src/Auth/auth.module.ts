import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET } from 'src/config/constants';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './application/auth.controller';
import { JwtStrategy } from './application/strategies/jwt.strategy';
import { LocalStrategy } from './application/strategies/local.strategy';
import { AuthService } from './domain/auth.service';
import { RecoverPasswordService } from './domain/recover-password.service';
import { MailerService } from './domain/mailer.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>(JWT_SECRET),
        signOptions: { expiresIn: '60m' },
      }),
    }),
    UserModule,
  ],
  providers: [AuthService, RecoverPasswordService, MailerService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }