import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './application/auth.controller';
import { AuthService } from './domain/auth.service';
import { Users } from '../entity/Users.entity';
import { Roles } from '../entity/Roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Roles])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
