import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rentals } from 'src/entity/Rentals.entity';
import { Repository } from 'typeorm';
import { CheckCar } from '../domain/dto/CheckCar.dto';
import { CreateRentalDto } from '../domain/dto/create-rental.dto';
import { Payments } from 'src/entity/Payments.entity';
import { RentalRepository } from '../domain/rental.repository';

@Injectable()
export class RentalService implements RentalRepository {

  constructor(
    @InjectRepository(Rentals)
    private readonly rentalRepository: Repository<Rentals>,
    @InjectRepository(Payments)
    private readonly paymentRepository: Repository<Payments>,
             
  ) { }

  async createRental(clientID: number, rental: CreateRentalDto) {
    throw new Error('Method not implemented.');
  }
  async createRentalEmployee(employeeID: number, rental: CreateRentalDto) {
    throw new Error('Method not implemented.');
  }

  async getAllByClient(clientID: number) {
    throw new Error('Method not implemented.');
  }
  async getAllByEmployee(employeeID: number) {
    throw new Error('Method not implemented.');
  }

  async checkCar(rentalID: number, checkCar: CheckCar) {
    try {
      const rental = await this.rentalRepository.findOne({
        where: { rentalId: rentalID }, relations:['payments']
      });

      rental.employee.employeeId = checkCar.employee;
      // rental.initialStatus = checkCar.initialStatus;
      rental.initialFuelLevel = checkCar.initialFuelLevel;
      if(rental.payments.length > 0){
        rental.status = 'EN CURSO';
      }
      await this.rentalRepository.save(rental);
      return
    } catch (error) {
      throw new BadRequestException("Datos para el Checkeo Incorrectos");
    }
  }

  async getAll() {
    return await this.rentalRepository.find({ relations: ['vehicle', 'employee', 'reservation'] });
  }

}

