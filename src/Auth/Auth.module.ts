// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './domain/auth.service';
import { AuthController } from './application/auth.controller';
import { Users } from 'src/entity/Users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
