import { Module } from '@nestjs/common';
import { RentalService } from './interface/rental.service';
import { RentalController } from './application/rental.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rentals } from 'src/entity/Rentals.entity';
import { UserModule } from 'src/user/user.module';
import { Vehicles } from 'src/entity/Vehicles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rentals,Vehicles]),UserModule],
  controllers: [RentalController],
  providers: [RentalService],
  exports: [RentalService]
})
export class RentalModule {}
