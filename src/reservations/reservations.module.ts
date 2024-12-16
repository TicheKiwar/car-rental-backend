import { Module } from '@nestjs/common';
import { ReservationsController } from './application/reservations.controller';
import { ReservationsService } from './interface/reservations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservations } from 'src/entity/Reservations.entity';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/Auth/auth.module';

@Module({
  imports:[AuthModule,TypeOrmModule.forFeature([Reservations]),UserModule,],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  
})
export class ReservationsModule {}
