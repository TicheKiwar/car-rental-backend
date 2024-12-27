import { BadRequestException, Injectable } from '@nestjs/common';
import { ReservationRepository } from '../domain/rental.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Rentals } from 'src/entity/Rentals.entity';
import { Repository } from 'typeorm';
import { CheckCar } from '../domain/dto/CheckCar.dto';

@Injectable()
export class RentalService implements ReservationRepository {

  constructor(
    @InjectRepository(Rentals)
    private readonly rentalRepository: Repository<Rentals>,
  ) { }

  async checkCar(rentalID: number, checkCar: CheckCar) {
    try {
      const rental = await this.rentalRepository.findOne({
        where: { rentalId: rentalID }, relations:['payments']
      });

      rental.employee.employeeId = checkCar.employee;
      // rental.initialStatus = checkCar.initialStatus;
      rental.initialFuelLevel = checkCar.initialFuelLevel;
      rental.initialMileage = checkCar.initialMileage;
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

