import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Returns } from '../entity/Returns.entity';
import { Rentals } from '../entity/Rentals.entity';
import { Employees } from '../entity/Employees.entity';
import { ReturnsController } from './aplication/return.controller';
import { ReturnsService } from './interface/return.service';

@Module({
  imports: [TypeOrmModule.forFeature([Returns, Rentals, Employees])],
  controllers: [ReturnsController],
  providers: [ReturnsService],
})
export class ReturnsModule {}
