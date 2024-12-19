import {  Injectable } from '@nestjs/common';
import { CreateRentalDto } from '../domain/dto/create-rental.dto';
import { ReservationRepository } from '../domain/rental.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Rentals } from 'src/entity/Rentals.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RentalService implements ReservationRepository{

  constructor(
    @InjectRepository(Rentals)
    private readonly rentalRepository: Repository<Rentals>,
  ) {}

  getAll() {
    return this.rentalRepository.find({relations: ['vehicle', 'employee', 'reservation']});
  }
  createRental(employeeID: number, createRentalDto: CreateRentalDto): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
