import { Module } from '@nestjs/common';
import { RentalService } from './interface/rental.service';
import { RentalController } from './application/rental.controller';

@Module({
  controllers: [RentalController],
  providers: [RentalService],
})
export class RentalModule {}
