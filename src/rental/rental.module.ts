import { Module } from '@nestjs/common';
import { RentalService } from './interface/rental.service';
import { RentalController } from './application/rental.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rentals } from 'src/entity/Rentals.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rentals])],
  controllers: [RentalController],
  providers: [RentalService],
})
export class RentalModule {}
